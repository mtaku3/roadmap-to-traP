import { env } from "@/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptAndVerify, signAndEncrypt } from "../jose";
import axios from "axios";
import { di } from "@/modules/di";
import { UserId } from "@/modules/domain/User/Identifier";
import { OAuthSessionJWTPayload } from "../auth";
import { User } from "@/modules/domain/User/Entity";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  if (code == null || state == null) {
    return NextResponse.json(
      {
        message: searchParams.get("error"),
      },
      {
        status: 500,
      },
    );
  }

  const oauthJwt = cookies().get(env.OAUTH_SESSION_COOKIE_NAME)?.value;
  if (oauthJwt == null) {
    return NextResponse.json(
      {
        message: "Session for authorization CSRF not found",
      },
      {
        status: 400,
      },
    );
  }
  cookies().delete(env.OAUTH_SESSION_COOKIE_NAME);

  let payload;
  try {
    payload = await decryptAndVerify<OAuthSessionJWTPayload>(oauthJwt);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Invalid oauth session",
      },
      { status: 400 },
    );
  }
  if (payload.state !== state) {
    return NextResponse.json(
      {
        message: "This is not our authorization request",
      },
      {
        status: 400,
      },
    );
  }

  let tokenResponse;
  try {
    tokenResponse = await axios.post<{
      access_token: string;
      token_type: string;
      expires_in: number;
    }>(
      "https://q.trap.jp/api/v3/oauth2/token",
      {
        grant_type: "authorization_code",
        code,
        client_id: env.TRAQ_CLIENT_ID,
        code_verifier: payload.code_verifier,
        client_secret: env.TRAQ_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to retrieve token from oauth provider" },
      { status: 500 },
    );
  }

  let userInfoResponse;
  try {
    userInfoResponse = await di.cradle.traqMeApi.getMe({
      headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message:
          "Retrieved access token does not have enough permission to get user info",
      },
      { status: 401 },
    );
  }

  let user;
  try {
    const userId = new UserId(userInfoResponse.data.id);
    user = (
      await di.cradle.userController.findById({
        id: userId,
      })
    ).user;
    if (user == null) {
      user = User.create(
        userId,
        userInfoResponse.data.name,
        userInfoResponse.data.displayName,
        userInfoResponse.data.iconFileId,
      );
      await di.cradle.userRepository.create(user);
    } else {
      user.setName(userInfoResponse.data.name);
      user.setDisplayName(userInfoResponse.data.displayName);
      user.setIconFileId(userInfoResponse.data.iconFileId);
      await di.cradle.userRepository.update(user);
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to create or update user",
      },
      { status: 500 },
    );
  }

  const tokenResponseTime = new Date(tokenResponse.headers["date"]);
  const expiresAt = new Date(
    tokenResponseTime.getTime() + tokenResponse.data.expires_in,
  );
  const appAuthJwt = await signAndEncrypt(
    {
      id: user.id.toString(),
      access_token: tokenResponse.data.access_token,
    },
    expiresAt,
  );
  cookies().set(env.APP_AUTH_SESSION_COOKIE_NAME, appAuthJwt, {
    expires: expiresAt,
    sameSite: "strict",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
  });

  return NextResponse.redirect(new URL("/", req.url));
}

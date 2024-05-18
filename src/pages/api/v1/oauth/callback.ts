import { env } from "@/env";
import { decryptAndVerify, signAndEncrypt } from "@/server/jose";
import axios from "axios";
import { di } from "@/modules/di";
import { UserId } from "@/modules/domain/User/Identifier";
import { OAuthSessionJWTPayload } from "@/server/auth";
import { User } from "@/modules/domain/User/Entity";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { createRouter } from "next-connect";

export const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const ctx = { req, res };

  const code = req.query.code as string | undefined;
  const state = req.query.state as string | undefined;
  if (code == null || state == null) {
    return res.status(500).json({
      message: req.query.error,
    });
  }

  const oauthJwt = nookies.get(ctx)[env.OAUTH_SESSION_COOKIE_NAME];
  if (oauthJwt == null) {
    return res.status(400).json({
      message: "Session for authorization CSRF not found",
    });
  }
  nookies.destroy(ctx, env.OAUTH_SESSION_COOKIE_NAME);

  let payload;
  try {
    payload = await decryptAndVerify<OAuthSessionJWTPayload>(oauthJwt);
  } catch (e) {
    return res.status(400).json({
      message: "Invalid oauth session",
    });
  }
  if (payload.state !== state) {
    return res.status(400).json({
      message: "This is not our authorization request",
    });
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
    return res
      .status(500)
      .json({ message: "Failed to retrieve token from oauth provider" });
  }

  let userInfoResponse;
  try {
    userInfoResponse = await di.cradle.traqMeApi.getMe({
      headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
    });
  } catch (e) {
    return res.status(401).json({
      message:
        "Retrieved access token does not have enough permission to get user info",
    });
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
    return res.status(500).json({
      message: "Failed to create or update user",
    });
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
  nookies.set(ctx, env.APP_AUTH_SESSION_COOKIE_NAME, appAuthJwt, {
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
  });

  return res.redirect("/");
});

export default router.handler();

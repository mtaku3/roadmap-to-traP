import { env } from "@/env.mjs";
import { di } from "@/modules/di";
import { User } from "@/modules/domain/User/Entity";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptAndVerify } from "./jose";
import { UserId } from "@/modules/domain/User/Identifier";

export interface OAuthSessionJWTPayload {
  code_verifier: string;
  state: string;
  nonce: string;
}

export interface AppAuthSessionJWTPayload {
  id: string;
  access_token: string;
}

export interface NextContext {
  user?: User;
  session?: AppAuthSessionJWTPayload;
}

export function authenticate(
  handler: (req: NextRequest, ctx: NextContext) => Promise<NextResponse>,
) {
  return async (req: NextRequest) => {
    const appAuthJwt = cookies().get(env.APP_AUTH_SESSION_COOKIE_NAME)?.value;
    if (appAuthJwt == null) {
      return await handler(req, {});
    } else {
      let payload;
      try {
        payload = await decryptAndVerify<AppAuthSessionJWTPayload>(appAuthJwt);
      } catch (e) {
        return NextResponse.json(
          {
            message: "Failed to decrypt and verify app auth session",
          },
          { status: 500 },
        );
      }

      let user;
      try {
        user = (
          await di.cradle.userController.findById({
            id: new UserId(payload.id),
          })
        )?.user;
        if (user == null) {
          cookies().delete(env.APP_AUTH_SESSION_COOKIE_NAME);
          return await handler(req, {});
        }
      } catch (e) {
        return NextResponse.json(
          {
            message: "Failed to find user by id",
          },
          { status: 500 },
        );
      }

      return await handler(req, { user });
    }
  };
}

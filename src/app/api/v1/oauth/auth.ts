import { env } from "@/env";
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

export async function authenticate(jwt: string) {
  let payload;
  try {
    payload = await decryptAndVerify<AppAuthSessionJWTPayload>(jwt);
  } catch (e) {
    throw new AuthMiddlewareException(
      "Failed to decrypt and verify app auth session",
    );
  }

  let user;
  try {
    user = (
      await di.cradle.userController.findById({
        id: new UserId(payload.id),
      })
    )?.user;
  } catch (e) {
    throw new AuthMiddlewareException("Failed to find user by id");
  }

  return user;
}

export function nextAuthMiddleware(
  handler: (req: NextRequest, ctx: NextContext) => Promise<NextResponse>,
) {
  return async (req: NextRequest) => {
    const appAuthJwt = cookies().get(env.APP_AUTH_SESSION_COOKIE_NAME)?.value;
    if (appAuthJwt == null) {
      return await handler(req, {});
    } else {
      let user;
      try {
        user = await authenticate(appAuthJwt);
      } catch (e) {
        let message = e instanceof Error ? e.message : undefined;
        return NextResponse.json({ message }, { status: 500 });
      }

      return await handler(req, { user });
    }
  };
}

export class AuthMiddlewareException extends Error {}

import { env } from "@/env";
import { di } from "@/modules/di";
import { User } from "@/modules/domain/User/Entity";
import { decryptAndVerify } from "./jose";
import { UserId } from "@/modules/domain/User/Identifier";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

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

export async function authenticate(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextContext> {
  const ctx = { req, res };
  const jwt = nookies.get(ctx)[env.APP_AUTH_SESSION_COOKIE_NAME];
  if (jwt == null) {
    return {};
  }

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

  return { user, session: payload };
}

export class AuthMiddlewareException extends Error {}

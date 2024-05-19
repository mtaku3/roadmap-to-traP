import { env } from "@/env";
import { generators } from "openid-client";
import { signAndEncrypt } from "@/server/jose";
import { authenticate } from "@/server/auth";
import nookies from "nookies";
import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const ctx = { req, res };
  const authCtx = await authenticate(req, res);

  if (authCtx.user != null) {
    return res.redirect(`${env.NEXT_PUBLIC_URL}/`);
  }

  const verifier = generators.codeVerifier();
  const challenge = generators.codeChallenge(verifier);
  const state = generators.state();
  const nonce = generators.nonce();

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);
  let jwt;
  try {
    jwt = await signAndEncrypt(
      {
        code_verifier: verifier,
        state,
        nonce,
      },
      expiresAt,
    );
  } catch (e) {
    return res.status(500).json({
      message: "Failed to sign and encrypt oauth session",
    });
  }
  nookies.set(ctx, env.OAUTH_SESSION_COOKIE_NAME, jwt, {
    path: "/api/v1/oauth/callback",
    sameSite: "lax",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
  });

  const authorizationURL = new URL("https://q.trap.jp/api/v3/oauth2/authorize");
  authorizationURL.searchParams.set("response_type", "code");
  authorizationURL.searchParams.set("client_id", env.TRAQ_CLIENT_ID);
  authorizationURL.searchParams.set("scope", "read");
  authorizationURL.searchParams.set("code_challenge_method", "S256");
  authorizationURL.searchParams.set("code_challenge", challenge);
  authorizationURL.searchParams.set("state", state);
  authorizationURL.searchParams.set("nonce", nonce);
  return res.redirect(authorizationURL.toString());
});

export default router.handler();

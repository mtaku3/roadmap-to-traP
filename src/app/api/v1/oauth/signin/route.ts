import { NextResponse } from "next/server";
import { env } from "@/env.mjs";
import { generators } from "openid-client";
import { signAndEncrypt } from "../../jose";
import { cookies } from "next/headers";
import { authenticate } from "../../auth";

export const GET = authenticate(async (req, ctx) => {
  if (ctx.user != null) {
    return NextResponse.redirect(new URL("/", req.url));
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
    return NextResponse.json(
      {
        message: "Failed to sign and encrypt oauth session",
      },
      { status: 500 },
    );
  }
  cookies().set(env.OAUTH_SESSION_COOKIE_NAME, jwt, {
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
  return NextResponse.redirect(authorizationURL);
});

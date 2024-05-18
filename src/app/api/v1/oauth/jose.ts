import { env } from "@/env";
import {
  CompactEncrypt,
  JWTPayload,
  SignJWT,
  compactDecrypt,
  jwtVerify,
} from "jose";
import crypto from "crypto";

const JWT_SIGNING_SECRET = new TextEncoder().encode(env.JWT_SIGNING_SECRET);
const JWT_ENCRYPTION_SECRET = crypto.createPublicKey(env.JWT_ENCRYPTION_SECRET);
const JWT_DECRYPTION_SECRET = crypto.createPrivateKey(
  env.JWT_DECRYPTION_SECRET,
);

export async function signAndEncrypt(payload: JWTPayload, expiresAt?: Date) {
  let signJwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();
  if (expiresAt != null) {
    signJwt = signJwt.setExpirationTime(expiresAt);
  }
  const signedJwt = await signJwt.sign(JWT_SIGNING_SECRET);

  const encryptedJwt = await new CompactEncrypt(
    new TextEncoder().encode(signedJwt),
  )
    .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
    .encrypt(JWT_ENCRYPTION_SECRET);
  return encryptedJwt;
}

export async function decryptAndVerify<T extends Object>(jwe: string) {
  const { plaintext } = await compactDecrypt(jwe, JWT_DECRYPTION_SECRET);
  const { payload } = await jwtVerify<T>(plaintext, JWT_SIGNING_SECRET);
  return payload;
}

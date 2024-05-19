import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string().url(),
    TRAQ_CLIENT_ID: z.string(),
    TRAQ_CLIENT_SECRET: z.string(),
    TRAQ_BOT_ACCESS_TOKEN: z.string(),
    OAUTH_SESSION_COOKIE_NAME: z.string(),
    APP_AUTH_SESSION_COOKIE_NAME: z.string(),
    JWT_SIGNING_SECRET: z.string(),
    JWT_ENCRYPTION_SECRET: z.string(),
    JWT_DECRYPTION_SECRET: z.string(),
    TRAQ_AUTH_USERNAME: z.string(),
    TRAQ_AUTH_PASSWORD: z.string(),
  },
  shared: {
    NEXT_PUBLIC_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    TRAQ_CLIENT_ID: process.env.TRAQ_CLIENT_ID,
    TRAQ_CLIENT_SECRET: process.env.TRAQ_CLIENT_SECRET,
    TRAQ_BOT_ACCESS_TOKEN: process.env.TRAQ_BOT_ACCESS_TOKEN,
    OAUTH_SESSION_COOKIE_NAME: process.env.OAUTH_SESSION_COOKIE_NAME,
    APP_AUTH_SESSION_COOKIE_NAME: process.env.APP_AUTH_SESSION_COOKIE_NAME,
    JWT_SIGNING_SECRET: process.env.JWT_SIGNING_SECRET,
    JWT_ENCRYPTION_SECRET: process.env.JWT_ENCRYPTION_SECRET,
    JWT_DECRYPTION_SECRET: process.env.JWT_DECRYPTION_SECRET,
    TRAQ_AUTH_USERNAME: process.env.TRAQ_AUTH_USERNAME,
    TRAQ_AUTH_PASSWORD: process.env.TRAQ_AUTH_PASSWORD,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
});

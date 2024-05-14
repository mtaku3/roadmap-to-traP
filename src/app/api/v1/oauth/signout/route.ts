import { NextResponse } from "next/server";
import { nextAuthMiddleware } from "../auth";
import axios from "axios";
import { cookies } from "next/headers";
import { env } from "@/env";

export const DELETE = nextAuthMiddleware(async (req, ctx) => {
  if (ctx.user == null) {
    return NextResponse.json(
      {
        message: "You are not logged in",
      },
      { status: 400 },
    );
  }

  try {
    await axios.post("https://q.trap.jp/api/v3/oauth2/revoke", {
      data: {
        token: ctx.session!.access_token,
      },
    });
  } catch (e) {
    console.warn("Failed to revoke token", e);
  }

  cookies().delete(env.APP_AUTH_SESSION_COOKIE_NAME);

  return new NextResponse(undefined, { status: 200 });
});

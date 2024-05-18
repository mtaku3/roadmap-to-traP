import axios from "axios";
import { env } from "@/env";
import nookies from "nookies";
import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@/server/auth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.delete(async (req, res) => {
  const ctx = { req, res };
  const authCtx = await authenticate(req, res);

  if (authCtx.user == null) {
    return res.status(400).json({
      message: "You are not logged in",
    });
  }

  try {
    await axios.post("https://q.trap.jp/api/v3/oauth2/revoke", {
      data: {
        token: authCtx.session!.access_token,
      },
    });
  } catch (e) {
    console.warn("Failed to revoke token", e);
  }

  nookies.destroy(ctx, env.APP_AUTH_SESSION_COOKIE_NAME);

  return res.status(200).send(null);
});

export default router.handler();

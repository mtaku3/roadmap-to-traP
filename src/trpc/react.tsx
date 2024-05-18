"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  loggerLink,
  unstable_httpBatchStreamLink,
  createTRPCClient as createVanillaTRPCClient,
  TRPCClientError,
} from "@trpc/client";
import { createTRPCReact as createTanstackQueryTRPCReact } from "@trpc/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import SuperJSON from "../server/api/superjson";

import { type AppRouter } from "@/server/api/root";

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

const links = [
  loggerLink({
    enabled: (op) =>
      process.env.NODE_ENV === "development" ||
      (op.direction === "down" && op.result instanceof Error),
  }),
  unstable_httpBatchStreamLink({
    transformer: SuperJSON,
    url: getBaseUrl() + "/api/v1/trpc",
    headers: () => {
      const headers = new Headers();
      headers.set("x-trpc-source", "nextjs-react");
      return headers;
    },
  }),
];

export const api = {
  tq: createTanstackQueryTRPCReact<AppRouter>(),
  v: createVanillaTRPCClient<AppRouter>({ links }),
};

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.tq.createClient({
      links,
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.tq.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.tq.Provider>
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

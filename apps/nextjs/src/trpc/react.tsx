"use client";

import type { QueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchStreamLink, loggerLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import SuperJSON from "superjson"

import type { AppRouter } from "@barebel/api"

import { env } from "~/env"
import { createQueryClient } from "./query-client"

export const api = createTRPCReact<AppRouter>()

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === "undefined") {
    return createQueryClient()
  }
  return (clientQueryClientSingleton ??= createQueryClient())
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) => env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
          headers() {
            const headers = new Headers()
            headers.set("x-trpc-source", "nextjs-react")
            return headers
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return "http://localhost:3000"
}

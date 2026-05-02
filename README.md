# roadmap-to-traP

A Next.js web app that helps [traP](https://trap.jp/) (Tokyo Tech's programming/creator circle) members discover and plan a learning roadmap by integrating with internal services such as [traQ](https://github.com/traPtitech/traQ) and [knoQ](https://github.com/traPtitech/knoQ).

> **Status:** Archived. This repository is no longer maintained.

## Stack

- [Next.js](https://nextjs.org/) (Pages Router) + TypeScript
- [tRPC](https://trpc.io/) for end-to-end typed APIs
- [Prisma](https://www.prisma.io/) ORM
- [Mantine](https://mantine.dev/) + [Tailwind CSS](https://tailwindcss.com/) for UI
- [React Flow](https://reactflow.dev/) + [dagre](https://github.com/dagrejs/dagre) for roadmap graph rendering
- [Jotai](https://jotai.org/), [TanStack Query](https://tanstack.com/query), [react-hook-form](https://react-hook-form.com/)
- traQ OIDC for authentication (`openid-client`, `jose`)

## Getting started

Requirements: Node.js 20+, pnpm, Docker (for the dev database).

```bash
pnpm install
docker compose up -d        # Postgres
pnpm prisma migrate dev
pnpm dev                    # http://localhost:3000
```

Environment variables are validated by `src/env.js` (see [@t3-oss/env-nextjs](https://env.t3.gg/)). Copy and fill in a `.env` accordingly.

### Generating external API clients

```bash
pnpm og:traq    # regenerate traQ client
pnpm og:knoq    # regenerate knoQ client
```

## Project layout

```
src/
  client/    # React UI components, hooks, pages assets
  modules/   # Domain modules (DDD-ish): infra (prisma), external (traq, knoq), ...
  pages/     # Next.js Pages Router entries + API routes
  server/    # tRPC routers, server-side wiring
  trpc/      # tRPC client/server setup
```

## License

[MIT](./LICENSE) © mtaku3

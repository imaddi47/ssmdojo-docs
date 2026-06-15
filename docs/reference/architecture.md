# Architecture

SSM Dojo is built as **one UI on two runtimes**, backed by a small privileged server.

## One UI, two runtimes

A Node server (Fastify + WebSocket) binds to `127.0.0.1` and exposes the engine over HTTP + WS.
The React UI is a pure client of that local API.

- **Web** — run the server, open the browser against it.
- **Desktop** — Electron boots the *same* server on a free localhost port and loads the *same* UI.

The server is the only privileged surface; the Electron renderer is sandboxed and talks to the
server only over HTTP/WebSocket. See the [Security model](/reference/security) for how that surface
is locked down.

## Monorepo packages

SSM Dojo is a pnpm + Turborepo monorepo with five packages:

| Package | Responsibility |
| --- | --- |
| **`@ssm/core`** | The engine — AWS SDK v3, `session-manager-plugin` lifecycle, SSH (`ssh2`), file transfers, JSON config/history/secret stores. Pure TypeScript, no UI, no HTTP. |
| **`@ssm/server`** | Fastify REST + `ws` channel wrapping core; streams tunnel status/logs and the SSH terminal. |
| **`@ssm/ui`** | Design system — CSS-variable tokens (light/dark, violet/teal), theme controller, presentational React components. |
| **`@ssm/app`** | The React + Vite application — TanStack Query for server state, Zustand for UI state. |
| **`@ssm/desktop`** | The Electron shell — boots the server, loads the app, and provides native integrations (OS keychain, auto-update, PATH resolution). |

### Dependency direction

Dependencies flow one way, which keeps `core` testable and UI-agnostic:

```
app → ui
app → server   (over HTTP)
server → core
desktop → server + app
core → (nothing internal)
```

## Tech stack

| Layer | Choices |
| --- | --- |
| Language / tooling | TypeScript 5, pnpm 10, Turborepo, ESLint, Prettier |
| Engine | AWS SDK v3 (`client-ssm`, `client-ec2`, `client-sts`, `credential-providers`), `ssh2`, `env-paths`, `ini` |
| Server | Fastify 5, `@fastify/websocket`, `@fastify/static` |
| Frontend | React 18, Vite 6, React Router, TanStack Query, Zustand, Tailwind, xterm.js |
| Desktop | Electron 33, electron-builder, electron-updater |
| Tests | Vitest (unit/TDD), Playwright (E2E) |

## Sessions

Tunnels are run by shelling out to `aws ssm start-session` via the Session Manager Plugin, behind a
`SessionLauncher` seam in `@ssm/core`. The session's stdout/stderr is parsed for lifecycle signals
and surfaced as `tunnel.status` / `tunnel.log` events over the WebSocket. Stopping a tunnel kills
the session's process group so the local port is freed cleanly.

## Decision records

Key decisions (stack, the one-server architecture, the persistence model) live in the source repo
under `docs/adr/` (see ADR `0001-stack-and-architecture`) and the design specs under
`docs/superpowers/specs/`.

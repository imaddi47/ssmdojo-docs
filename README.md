# ssmdojo-docs

Documentation and release management for **SSM Dojo** — a cross-platform AWS Systems Manager
client (tunnels, SSH, file transfer, RDP). This repo holds the documentation website, the
per-version changelogs, and serves as the auto-update release feed for the desktop app.

## What's here

| Path | Purpose |
| --- | --- |
| `docs/` | VitePress documentation site (guide, features, reference, releases). |
| `changelog/` | Per-version release notes (`vX.Y.Z.md`). |
| `AGENTS.md` / `CLAUDE.md` / `.codex/` | AI-agent setup with task-based model/effort routing (see `AGENTS.md`). |
| `CHANGELOG.md` | Changelog for this docs repo itself. |

## Documentation website

Built with [VitePress](https://vitepress.dev) (static — no database).

```bash
# Node 18+ (see .nvmrc); this repo uses pnpm
pnpm install
pnpm docs:dev       # local dev server with hot reload
pnpm docs:build     # production build → docs/.vitepress/dist
pnpm docs:preview   # preview the production build
```

The content lives in `docs/` as Markdown; navigation is configured in
`docs/.vitepress/config.ts`.

## Documentation scope

This site documents how to **install and use** the SSM Dojo desktop app — it intentionally
excludes implementation details of the (private) application source. The published documentation
website and the release downloads are the public surface; the app's codebase is not.

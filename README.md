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
# Node 18+ (see .nvmrc → 20)
npm install
npm run docs:dev       # local dev server with hot reload
npm run docs:build     # production build → docs/.vitepress/dist
npm run docs:preview   # preview the production build
```

The content lives in `docs/` as Markdown; navigation is configured in
`docs/.vitepress/config.ts`.

## Source project

The product being documented is [ssm-manager-e2e](https://github.com/imaddi47/ssm-manager-e2e).
Documentation tracks the latest released tag.

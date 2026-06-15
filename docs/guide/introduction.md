# Introduction

**SSM Dojo** is a cross-platform desktop client for AWS Systems Manager. It turns the
fiddly `aws ssm start-session` workflow into a fast, card-based UI for:

- **Tunnels** — SSM port-forwarding sessions to an instance or a remote host behind it (the primary feature).
- **Instances** — discovering EC2/SSM-managed instances and acting on them.
- **SSH & Terminal** — direct SSH connections with a live terminal.
- **File transfers** — a Finder-style browser with rsync/scp transfers over SSH.
- **RDP** — handing a tunnel off to your platform's native Remote Desktop client.

It runs as a localhost web app **and** an Electron desktop app (macOS / Linux / Windows)
from a single codebase.

## How it works

SSM Dojo follows a **one UI, two runtimes** model:

- A small Node server (Fastify + WebSocket) binds to `127.0.0.1` and wraps the engine.
- The React UI is a pure client of that local API.
- **Web** = run the server, open a browser. **Desktop** = Electron boots the same server on a
  free localhost port and loads the same UI.

The server is the only privileged surface; the desktop renderer is sandboxed. See
[Architecture](/reference/architecture) for the full picture.

## What you need

SSM Dojo drives the official AWS tooling under the hood, so you need:

- **AWS CLI v2** and the **AWS Session Manager Plugin** on your `PATH` (required to start sessions).
- **AWS credentials** in `~/.aws` — named profiles, SSO, or assume-role all work.
- For local development: **Node 20+** and **pnpm 10+**.

See [Installation](/guide/installation) for setup, then [Quickstart](/guide/quickstart) to
open your first tunnel.

## Who it's for

Anyone who reaches EC2 instances through Session Manager and is tired of juggling CLI flags,
local ports, and SSH keys — engineers, SREs, and support teams who want tunnels, shells, file
transfers, and RDP behind one approachable UI.

::: tip Documentation scope
This site documents the released product (currently **v0.2.1**). Feature availability and exact
behavior track the published desktop builds. See the [Changelog](/releases/changelog) for what
shipped in each version.
:::

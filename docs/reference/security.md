# Security model

SSM Dojo keeps all privilege in a local server and exposes nothing to the network. This page
explains the boundaries so you can reason about what's safe.

## Loopback-only server

The engine runs inside a Node server bound to `127.0.0.1` — never `0.0.0.0`. In the desktop app the
port is OS-assigned (random per launch). Because the server only listens on the loopback interface,
it isn't reachable from your network.

## Per-launch token

On top of loopback binding, the desktop app gates the local server with a **fresh token generated
every launch** (32 random bytes, hex-encoded):

- **Generation** — the Electron main process creates the token at startup and hands it to the
  server.
- **HTTP** — every request to `/api/*` and the static assets must carry
  `Authorization: Bearer <token>`. The desktop app injects this header automatically (via Electron's
  `onBeforeSendHeaders`) for requests to the app origin, and the token is compared **in constant
  time** to avoid timing leaks.
- **WebSockets** — browsers can't set headers on a WS handshake, so the token rides as a `?token=`
  query parameter, validated the same way.
- **How the UI gets it** — the token is passed to the renderer through the Electron preload bridge
  (exposed as `window.ssm.apiToken`), not over HTTP, so a page can't fish it out of a network
  response.

::: tip Web / dev mode
When no token is configured (plain web mode, local dev, or E2E), the auth gate is open — there's no
desktop keychain or Electron preload to anchor the token, and loopback binding is the boundary. Run
untrusted contexts only where you'd be comfortable with that.
:::

## Sandboxed renderer

In the desktop app the Electron renderer is sandboxed: no Node integration, no direct filesystem or
IPC access to privileged APIs. It talks to the server only over HTTP/WebSocket, and external links
open in your system browser rather than navigating the app window.

## SSH host-key trust on first use

For SSH and file transfers, the remote host key is recorded on first connect and pinned (per
connection, in `known_hosts/<tunnelId>`). A changed key is rejected as a possible
man-in-the-middle. File transfers use `StrictHostKeyChecking=accept-new` against that per-tunnel
known-hosts file.

## Secrets handling

- **RDP passwords** (optional) are encrypted with your OS keychain (`safeStorage`) and stored in
  `secrets.json`. Plaintext never touches disk; a decryption failure never blocks a launch.
- **SSH passphrases** and **sudo passwords** live in memory only and are cleared when a connection
  stops, its config changes, the tunnel is deleted, or the app restarts.
- **AWS credentials** are never stored by SSM Dojo — they're read from your standard `~/.aws` files
  through the AWS SDK.

## What SSM Dojo can do on your machine

Because it drives real tooling, SSM Dojo can: start/stop `aws ssm` sessions, open SSH connections,
run remote commands for file operations (including under `sudo` when you supply a password), free
local ports by terminating the holding process (with your consent), and launch your native RDP
client. All of this is local and user-initiated; nothing is exposed to the network beyond the AWS
API calls your credentials authorize.

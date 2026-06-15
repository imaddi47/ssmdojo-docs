# SSH & Terminal

SSM Dojo supports **direct SSH connections** and a built-in **terminal** that runs an interactive
shell over your connection.

## Direct SSH connections

A connection can be a direct SSH connection (kind `ssh`) rather than an SSM tunnel. You manage it
like any other connection — connect, disconnect, and see live status — and create one straight
from a discovered [instance](/features/instances).

- **Connect / Disconnect** controls bring the SSH connection up or down.
- The instance's address is resolved for you when creating from Instances.
- A per-tunnel SSH **connection pool** keeps the UI responsive during transfers.

## Authentication

When SSM Dojo opens an SSH connection it resolves your key in this order:

1. An explicit **key path** set on the connection.
2. The **SSH agent**, if `SSH_AUTH_SOCK` is set.
3. Default keys: `~/.ssh/id_ed25519`, then `~/.ssh/id_rsa`.

### Encrypted keys (passphrases)

If your private key is passphrase-protected, SSM Dojo prompts you for the passphrase in the UI and
retries the connect (up to a few attempts). **Passphrases are held in memory only** — never written
to disk — and are cleared when the connection is stopped or the app restarts.

### Host-key trust on first use

The first time you connect, the remote **host key** is recorded and pinned to the connection. On
later connects the presented key is compared; if it changed, the connection is rejected as a
possible man-in-the-middle. To accept a legitimately changed key, edit the connection to reset the
stored key.

## Terminal

The **Terminal** gives you a full xterm-based shell over an SSH connection.

- **Persistent across navigation** — the terminal session lives in a registry, so switching tabs
  or screens doesn't kill your shell. Come back and it's still there.
- **Resizes** with the window (the remote PTY is resized to match).
- **Passphrase prompt** appears inline if the key is encrypted.
- **Stopped state with retry** — if the session ends, the terminal shows a clear stopped state you
  can retry from.

::: warning Session lifetime
A terminal session stays alive while you navigate, but stopping the underlying tunnel/connection
ends the shell, and closing the desktop app stops all connections and terminals.
:::

## Related API

Direct SSH uses `POST /api/tunnels/:id/ssh/connect` and `:id/ssh/disconnect`; the live terminal
runs over the `/ws/terminal?tunnel=<id>` WebSocket. See the [Server API reference](/reference/api).

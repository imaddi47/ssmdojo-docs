# SSH & Terminal

SSM Dojo runs an interactive shell and a file browser over SSH. The SSH screen lists every
connection that can speak SSH: standalone SSH machines and SSM tunnels that have SSH turned on.

## Connecting

Connecting happens when you open a connection's **Terminal** or **Files**. SSM Dojo brings the
connection up for you and the status light turns green once it is ready, so there is no separate
Connect step to click first. While a connection is running, a **Disconnect** button is there if you
want to drop it.

Each row shows the connection's status and identity along with four actions:

- **Files** opens the [file browser](/features/file-transfers) for that machine.
- **Terminal** opens a shell (see below).
- **Edit** changes the connection. A standalone SSH machine is edited in place; for a tunnel that
  has SSH enabled, Edit takes you to the [Tunnels](/features/tunnels) screen, where the tunnel
  itself is managed.
- **Delete** removes a standalone SSH connection after a confirmation dialog.

If a connection drops or fails to come up, SSM Dojo shows a notification with the error instead of
leaving you to read it off the status light.

You can also create a standalone SSH connection straight from a discovered
[instance](/features/instances); its address is filled in for you.

## Authentication

When SSM Dojo opens an SSH connection it resolves your key in this order:

1. An explicit **key path** set on the connection.
2. Your **SSH agent**, if one is running (`SSH_AUTH_SOCK`).
3. Default keys: `~/.ssh/id_ed25519`, then `~/.ssh/id_rsa`.

### Encrypted keys (passphrases)

If your private key is passphrase-protected, SSM Dojo prompts you for the passphrase and retries
the connection (up to a few attempts). Passphrases are kept in memory only, never written to disk,
and are cleared when the connection stops or the app restarts.

### Host-key trust on first use

The first time you connect, the remote host key is recorded and pinned to the connection. On later
connects the presented key is compared; if it changed, the connection is rejected as a possible
man-in-the-middle. To accept a legitimately changed key, edit the connection to reset the stored
key.

## Terminal

The Terminal gives you a full shell over an SSH connection.

The terminal stays connected when you switch tabs or screens, so it is still there when you come
back. It also resizes with the window, and shows the passphrase prompt inline if the key is
encrypted. If the session ends, it shows a clear stopped state with a retry option.

::: warning Session lifetime
A terminal session stays alive while you navigate, but stopping the underlying tunnel or connection
ends the shell, and closing the app stops all connections and terminals.
:::

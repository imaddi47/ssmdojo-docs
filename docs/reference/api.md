# Server API reference

The `@ssm/server` package exposes the engine over an HTTP + WebSocket API bound to `127.0.0.1`.
This is an internal API consumed by the UI; it's documented here for contributors and for anyone
debugging the app. Every request is gated by the per-launch token (see
[Security model](/reference/security)).

All HTTP routes are under `/api`.

## System & health

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness plus prerequisite status. |
| `GET` | `/api/prereqs` | Detailed AWS CLI / Session Manager Plugin / SSH-key availability. |
| `GET` | `/api/regions` | List AWS regions (all partitions). |
| `POST` | `/api/system/free-port` | Free a local port held by another process. |

## AWS

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/profiles` | List AWS credential profiles from `~/.aws`. |
| `GET` | `/api/instances?profile=&region=&q=&scan=` | Discover EC2/SSM instances; `q` filters, `scan` selects all vs managed. |
| `GET` | `/api/instances/:id/address?profile=&region=` | Resolve an instance's address. |
| `GET` | `/api/ssh-keys` | List available SSH keys. |

## Tunnels

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/tunnels` | List tunnel definitions with live status. |
| `POST` | `/api/tunnels` | Create a tunnel (SSM or direct SSH). |
| `PATCH` | `/api/tunnels/:id` | Edit a tunnel; restarts it if running. |
| `DELETE` | `/api/tunnels/:id` | Delete a tunnel; stops the session and clears its secrets/passphrases. |
| `POST` | `/api/tunnels/:id/start` | Start the SSM session. |
| `POST` | `/api/tunnels/:id/stop` | Stop the session. |
| `POST` | `/api/tunnels/:id/retry` | Restart a failed session. |

## SSH

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/tunnels/:id/ssh/connect` | Establish a direct SSH connection. |
| `POST` | `/api/tunnels/:id/ssh/disconnect` | Close the direct SSH connection. |

## Files & transfers

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/tunnels/:id/files/list` | List a remote directory (optionally under sudo). |
| `DELETE` | `/api/tunnels/:id/files` | Delete remote files/dirs (optionally under sudo). |
| `POST` | `/api/tunnels/:id/files/precheck` | Check which local files exist (upload prep). |
| `POST` | `/api/tunnels/:id/files/remote-precheck` | Check which remote files exist (overwrite warning). |
| `POST` | `/api/tunnels/:id/transfers` | Start an upload/download (rsync/scp/streaming). |
| `GET` | `/api/transfers` | List in-flight and recent transfers. |
| `POST` | `/api/transfers/:jobId/cancel` | Cancel a transfer. |

## RDP

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/tunnels/:id/rdp/launch` | Generate the `.rdp` file and open the native client; may return a stored password. |

## Transfer history

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/history` | List transfer/delete audit records (newest first). |
| `DELETE` | `/api/history` | Clear the history. |

## Settings

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/settings` | Read user preferences. |
| `PUT` | `/api/settings` | Update preferences (merged). |

## WebSocket channels

### Event stream — `/ws?token=<token>`

A one-way subscription to server events:

- `{ type: 'tunnel.status', id, status }` — status is one of `idle | starting | connected | reconnecting | error | stopping`.
- `{ type: 'tunnel.log', id, line }` — a streamed log line.
- `{ type: 'file.transfer', job }` — transfer progress.

### Terminal — `/ws/terminal?tunnel=<id>&token=<token>`

A two-way SSH terminal channel:

- **Client → server:** `{ type: 'input', data }`, `{ type: 'resize', cols, rows }`, `{ type: 'passphrase', value }`
- **Server → client:** `{ type: 'data', data }`, `{ type: 'status', state }`, `{ type: 'exit', code }`, `{ type: 'error', message }`, `{ type: 'passphrase-required', retry }`

::: tip Token on WebSockets
Browsers can't set headers on a WebSocket handshake, so the token rides as a `?token=` query
parameter rather than the `Authorization` header used for HTTP. See [Security model](/reference/security).
:::

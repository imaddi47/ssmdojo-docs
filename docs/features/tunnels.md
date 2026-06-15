# Tunnels

Tunnels are SSM Dojo's primary feature: AWS Systems Manager **port-forwarding** sessions that
expose a remote port on `127.0.0.1:<local port>` on your machine.

## Creating a tunnel

Create one from **Tunnels → Create**, or straight from a discovered instance in
[Instances](/features/instances). A tunnel definition has:

| Field | Meaning |
| --- | --- |
| **Name** | A human label for the tunnel. |
| **Profile / Region** | The AWS profile and region the session runs in. |
| **Mode** | `instance` or `remote-host` (see below). |
| **Target** | The SSM-managed instance ID (the session's entry point). |
| **Local port** | The port opened on your machine (`1–65535`). |
| **Remote port** | The destination port. |
| **Remote host** | Only for `remote-host` mode — the host reachable from the instance. |
| **Auto-reconnect** | Whether to reconnect automatically. |
| **SSH config** | Optional — marks the tunnel for SSH (user + optional key path). |

The create/edit form uses dropdowns-with-custom-input for profile, region, instance, and key, so
you can pick a discovered value or type your own.

## Modes

- **Instance mode** uses `AWS-StartPortForwardingSession` to forward to a port on the instance itself.
- **Remote-host mode** uses `AWS-StartPortForwardingSessionToRemoteHost` to forward to another host
  reachable from the instance (e.g. an RDS endpoint), using the instance as a jump host. Requires a
  **remote host** value.

## Lifecycle

A running tunnel moves through these states, streamed live to its card:

```
idle → starting → connected → (reconnecting) → stopped | error
```

- **Start** — launches the SSM session. Status and logs appear on the card in real time.
- **Stop** — ends the session and frees the local port (the session's process group is killed, so
  the plugin doesn't linger).
- **Retry** — relaunches a failed tunnel.
- **Edit in place** — expand the card to edit; if the tunnel is running, it restarts with the new
  config. Logs clear when a fresh session starts.

## Local-port conflict handling

Before starting, SSM Dojo checks whether your chosen local port is already in use — using `lsof`
rather than a bind probe, so it catches listeners bound to any address (including Docker on
`0.0.0.0`).

- If a **foreign process** holds the port, you get an **informed-consent prompt** showing the
  service name, PID(s), and working directory. You can free the port (the holder is killed) or
  change the port.
- If only a **lingering Session Manager Plugin** from a prior run holds it, SSM Dojo polls up to
  ~5 seconds for it to release before starting.

::: warning Platform note
Port-holder detection uses `lsof`, which is available on macOS and Linux. On Windows, the
conflict detail is more limited. Process termination uses a process-group kill on macOS/Linux and
a kill-tree (`taskkill /T /F`) on Windows.
:::

## Traffic and logs

Each tunnel card surfaces live status and streamed log lines from the session. Transfer-style
progress (for file operations over a tunnel) is reported separately — see
[File transfers](/features/file-transfers).

## From an instance

In [Instances](/features/instances), you can create a tunnel directly from a discovered instance —
the target instance ID is filled in for you, and badges show which instances already have
SSH/tunnel connections.

## Related API

Tunnels are managed by the local server's `/api/tunnels` routes (`GET`, `POST`, `PATCH`, `DELETE`,
plus `:id/start`, `:id/stop`, `:id/retry`) and stream status over the `/ws` WebSocket. See the
[Server API reference](/reference/api).

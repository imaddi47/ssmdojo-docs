# Tunnels

Tunnels are SSM Dojo's primary feature: AWS Systems Manager **port-forwarding** sessions that
expose a remote port on `127.0.0.1:<local port>` on your machine.

## Creating a tunnel

Create one from **Tunnels → Create**, or straight from a discovered instance in
[Instances](/features/instances). A tunnel has:

| Field | Meaning |
| --- | --- |
| **Name** | A human label for the tunnel. |
| **Profile / Region** | The AWS profile and region the session runs in. |
| **Mode** | `instance` or `remote-host` (see below). |
| **Target** | The SSM-managed instance the session connects through. |
| **Local port** | The port opened on your machine (`1–65535`). |
| **Remote port** | The destination port. |
| **Remote host** | Only for `remote-host` mode — the host reachable from the instance. |
| **Auto-reconnect** | Whether to reconnect automatically. |
| **SSH details** | Optional — marks the tunnel for SSH (user + optional key path). |

The create/edit form offers dropdowns with custom input for profile, region, instance, and key,
so you can pick a discovered value or type your own.

## Modes

- **Instance mode** forwards to a port on the SSM-managed instance itself. Example: reach a service
  running on the box.
- **Remote-host mode** forwards to another host reachable *from* the instance (e.g. an RDS
  database), using the instance as a jump host. This mode requires a **remote host** value.

## Lifecycle

A running tunnel moves through these states, shown live on its card:

```
idle → starting → connected → (reconnecting) → stopped | error
```

- **Start** — opens the SSM session. Status and logs appear on the card in real time.
- **Stop** — ends the session and frees the local port cleanly.
- **Retry** — relaunches a failed tunnel.
- **Edit in place** — expand the card to edit; if the tunnel is running, it restarts with the new
  settings. Logs clear when a fresh session starts.

When a tunnel is connected, point your client at `127.0.0.1:<local port>`.

## Local-port conflict handling

Before starting, SSM Dojo checks whether your chosen local port is already in use — and it catches
services bound to any address (including things like Docker), not just `localhost`.

- If a **foreign process** holds the port, you get an **informed-consent prompt** showing the
  service name, process ID(s), and working directory. You can free the port (the holder is stopped)
  or change the port.
- If only a **leftover session** from a prior run is holding it, SSM Dojo waits a few seconds for it
  to release before starting.

::: warning Platform note
Rich port-holder details (name, PID, working directory) are available on macOS and Linux. On
Windows the conflict detail is more limited — if a start fails on a busy port, pick a different
local port.
:::

## From an instance

In [Instances](/features/instances), you can create a tunnel directly from a discovered instance —
the target is filled in for you, and badges show which instances already have SSH/tunnel
connections.

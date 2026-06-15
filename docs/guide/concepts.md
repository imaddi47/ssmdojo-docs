# Core concepts

A quick mental model of the pieces you work with in SSM Dojo.

## Profiles and regions

Everything you do is scoped to an **AWS profile** and a **region**, chosen in the top bar.

- Profiles come from your `~/.aws/config` and `~/.aws/credentials` (named profiles, SSO, or
  assume-role). SSM Dojo lists and de-duplicates them for you.
- The region list covers all AWS partitions and is type-to-filter.
- You can set a **default profile** and **default region** in [Settings](/features/settings) so
  they're selected on launch.

## Connections

A **connection** in SSM Dojo is a saved definition you can start, stop, edit, and reuse. Every
connection is tied to a profile, region, and target. There are two kinds:

- **Tunnel (SSM)** — an SSM port-forwarding session. The default and primary workflow.
- **SSH (direct)** — a direct SSH connection (still surfaced as a connection you manage).

Connections are persisted to disk so they survive restarts (see
[Configuration & data](/reference/configuration)).

## Tunnel modes

A tunnel forwards a **local port** on your machine to a **remote port**, in one of two modes:

- **Instance mode** — forward to a port on the SSM-managed instance itself
  (`AWS-StartPortForwardingSession`). Example: reach a service running on the box.
- **Remote-host mode** — forward to a host reachable *from* the instance
  (`AWS-StartPortForwardingSessionToRemoteHost`). Example: reach an RDS database or another
  internal endpoint, using the instance as a jump host. This mode requires a **remote host** value.

## Instances

The **Instances** view discovers EC2/SSM-managed instances for the current profile + region by
combining SSM (`DescribeInstanceInformation`) and EC2 (`DescribeInstances`) data. You can filter,
see SSM reachability, and create a tunnel or SSH connection directly from an instance.

## Sessions and the local server

When you start a tunnel, SSM Dojo launches an `aws ssm start-session` process via the Session
Manager Plugin and tracks its lifecycle:

```
idle → starting → connected → (reconnecting) → stopped | error
```

Status and logs stream live to the UI over a WebSocket. All of this runs inside the local server
bound to `127.0.0.1` — see [Architecture](/reference/architecture) and the
[Security model](/reference/security).

## Trust on first use (TOFU)

For SSH and file transfers, SSM Dojo records the remote **host key** the first time it connects
and pins it for later connections. If the key changes, the connection is rejected (a possible
man-in-the-middle), and you can reset it by editing the connection. This is the same model
OpenSSH uses with `known_hosts`.

## Where things live

- **Connections & settings** are stored as JSON in your OS config directory.
- **Secrets** (e.g. optional RDP passwords) are encrypted with your OS keychain.
- **Transfer history** is an append-only audit log.

Exact paths and schemas are in [Configuration & data](/reference/configuration).

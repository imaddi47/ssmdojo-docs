# Quickstart

This walks you through opening your first SSM tunnel — for example, forwarding a remote
database port to your laptop.

## 1. Pick a profile and region

Use the top bar to choose the **AWS profile** and **region** you want to work in. SSM Dojo reads
your profiles from `~/.aws`. You can set defaults later in [Settings](/features/settings) so they
load automatically.

::: tip SSO profiles
If your profile uses AWS SSO, run `aws sso login --profile <name>` in a terminal first. SSM Dojo
detects expired/`sso-login-required` credentials and tells you when a refresh is needed.
:::

## 2. Find your instance

Open **Instances**. SSM Dojo scans EC2/SSM-managed instances for the selected profile + region.
Filter by name or instance ID to find your target. Each instance shows whether it's reachable via
SSM, plus badges for any existing SSH/tunnel connections.

See [Instances](/features/instances) for details.

## 3. Create a tunnel

You can create a tunnel straight from a discovered instance, or open **Tunnels → Create**. Fill in:

- **Name** — a label for the tunnel.
- **Mode** — *instance* (forward to a port on the instance itself) or *remote-host* (forward to a
  host reachable from the instance, e.g. an RDS endpoint).
- **Target** — the instance ID (auto-filled when created from Instances).
- **Local port** — the port on your machine, e.g. `5432`.
- **Remote port** — the port on the target, e.g. `5432`.
- **Remote host** — only for *remote-host* mode (e.g. `db.internal.example.com`).

Save it. See [Tunnels](/features/tunnels) for the full field reference and editing.

## 4. Start it

Press **Start** on the tunnel card. SSM Dojo:

1. Checks that your chosen local port is free. If another process holds it, you'll get an
   informed-consent prompt (it shows the holder's name, PID, and working directory) so you can
   free the port or pick another.
2. Starts the SSM session via the Session Manager Plugin.
3. Streams live status and logs to the card (`starting → connected`).

Once it shows **connected**, point your client at `127.0.0.1:<local port>`:

```bash
psql -h 127.0.0.1 -p 5432 -U myuser mydb
```

## 5. Stop or edit

- **Stop** ends the session and frees the local port.
- **Edit** the tunnel in place; if it's running, SSM Dojo restarts it with the new settings.
- **Retry** relaunches a failed tunnel.

## Where to go next

- [Tunnels](/features/tunnels) — modes, port-conflict handling, traffic.
- [SSH & Terminal](/features/ssh-and-terminal) — open a shell over a tunnel.
- [File transfers](/features/file-transfers) — move files over SSH.
- [Core concepts](/guide/concepts) — profiles, regions, connection kinds.

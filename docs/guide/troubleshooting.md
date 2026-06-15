# Troubleshooting

Common issues and how to resolve them.

## "SSM Dojo is damaged and can't be opened" (macOS)

This appears for **unsigned pre-release** DMGs that macOS has quarantined. The app isn't damaged.
Drag it to `/Applications` and clear the quarantine attribute once:

```bash
xattr -dr com.apple.quarantine "/Applications/SSM Dojo.app"
```

Signed/notarized releases open normally and don't need this. See
[Installation → macOS](/guide/installation#macos).

## Tunnels won't start / "prerequisites missing"

SSM Dojo needs the **AWS CLI v2** and the **AWS Session Manager Plugin** on your `PATH`. Check the
prerequisites indicator in the app, and verify on the command line:

```bash
aws --version
session-manager-plugin
```

Install links are in [Installation → Prerequisites](/guide/installation#prerequisites). If they're
installed but not detected, make sure they're on the `PATH` your shell uses (the desktop app reads
your login shell's `PATH`).

## No instances appear

- Confirm the **profile** and **region** in the top bar are the ones your instances live in.
- For **SSO** profiles, run `aws sso login --profile <name>` first — SSM Dojo will flag
  `sso-login-required`/expired credentials.
- Only instances with a running **SSM Agent** and the right instance profile show up as
  SSM-reachable. Use the all-EC2 scan to see instances that aren't yet SSM-managed.

## "Port already in use" when starting a tunnel

Another process holds your chosen local port. SSM Dojo shows the holder (name, PID, working
directory) and lets you free the port or change it. If it was a leftover Session Manager Plugin
from a prior run, SSM Dojo waits briefly for it to release on its own.

::: warning Windows note
Local-port holder detection relies on `lsof` (macOS/Linux). On Windows the conflict detail is more
limited — pick a different local port if a start fails on a busy port.
:::

## SSH key passphrase keeps prompting

If your key is passphrase-protected, SSM Dojo prompts on connect and retries. Passphrases are kept
in memory only and cleared when the connection stops or the app restarts, so you'll be asked again
next session. Use an SSH agent (`SSH_AUTH_SOCK`) to avoid re-entering it.

## "Host key changed" / SSH connection rejected

SSM Dojo pins the remote host key on first connect (trust-on-first-use). A changed key is rejected
as a possible man-in-the-middle. If the change is legitimate (the host was rebuilt), edit the
connection to reset the stored host key, then reconnect.

## RDP won't launch

You need a native RDP client registered for `.rdp` files — e.g. **Microsoft Remote Desktop** on
macOS, the built-in `mstsc` on Windows. The tunnel must be **connected** before launching. If no
client is registered, SSM Dojo reports a platform-specific error.

## Where are my settings / tunnels stored?

In your OS config directory under `ssm-manager/` — see
[Configuration & data](/reference/configuration) for exact paths and what each file holds.

# RDP

SSM Dojo can hand a tunnel off to your platform's **native Remote Desktop client**, so you can
reach a Windows host through an SSM port-forwarding tunnel.

## How it works

1. **Mark a tunnel for RDP.** Set up a tunnel that forwards the remote RDP port (typically `3389`)
   to a local port.
2. **Launch.** With the tunnel **connected**, hit launch. SSM Dojo opens your operating system's
   native Remote Desktop client pointed at the local end of the tunnel:
   - **macOS** — Microsoft Remote Desktop (if installed)
   - **Windows** — the built-in Remote Desktop client (`mstsc`)
   - **Linux** — whatever client is registered for `.rdp` files
3. **Authenticate** in the native client.

If no RDP client is available, SSM Dojo shows a clear, platform-specific message telling you what
to install.

## Credentials

By default you type your username and password in the native client, and nothing is stored.

Optionally, you can save an **RDP password** with the tunnel. When you do, it's encrypted using
your operating system's secure credential store (macOS Keychain, Windows Credential Manager, or the
Linux secret service) — the plain password is never written to disk. On launch, a saved password is
made available to the client for you. If it can't be read for any reason, you simply type it as
usual.

::: warning Saving passwords
Saved-password encryption relies on your OS credential store, which is available in the desktop
app. Prefer typing credentials in the native client if you're not comfortable storing them.
:::

## Requirements

- A native RDP client installed (e.g. **Microsoft Remote Desktop** on macOS, the built-in client on
  Windows).
- A connected tunnel forwarding the target's RDP port.

See [Security & privacy](/reference/security) for how saved credentials are protected.

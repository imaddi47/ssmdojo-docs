# RDP

SSM Dojo can hand a tunnel off to your platform's **native Remote Desktop client**, so you can
reach a Windows host through an SSM port-forwarding tunnel.

## How it works

1. **Mark a tunnel for RDP.** Set up a tunnel that forwards the remote RDP port (typically `3389`)
   to a local port.
2. **Launch.** With the tunnel **connected**, hit launch. SSM Dojo generates a small `.rdp` file
   pointing at `127.0.0.1:<local port>` and opens it with your OS's native client:
   - **macOS** — `open` (Microsoft Remote Desktop, if installed)
   - **Windows** — `mstsc`
   - **Linux** — `xdg-open` (whatever `.rdp` handler is registered)
3. **Authenticate** in the native client.

If no RDP client is registered for `.rdp` files, SSM Dojo reports a clear, platform-specific error
telling you what to install.

## Credentials

By default the generated `.rdp` file sets *prompt for credentials* — you type your username and
password in the native client, and nothing is stored.

Optionally, you can store an **RDP password** with the tunnel:

- It's encrypted with your **OS keychain** via Electron `safeStorage` (macOS Keychain, Windows
  DPAPI, Linux libsecret) and saved to a `secrets.json` vault keyed by tunnel.
- On launch, if a stored password decrypts successfully, SSM Dojo returns it so the client can copy
  it to the clipboard for you.
- The plaintext password is never written to disk, and a decryption failure never blocks the
  launch — you just fall back to typing it.

::: warning Desktop-only encryption
Credential encryption relies on the OS keychain available in the desktop (Electron) app. In a
plain web/dev context there's no OS keychain, so storing RDP passwords isn't secure there — prefer
*prompt for credentials* outside the packaged desktop app.
:::

## Requirements

- A native RDP client installed and registered for `.rdp` files (e.g. **Microsoft Remote Desktop**
  on macOS, the built-in `mstsc` on Windows).
- A connected tunnel forwarding the target's RDP port.

## Related API

Launch is `POST /api/tunnels/:id/rdp/launch`. See the [Server API reference](/reference/api).

# RDP

SSM Dojo hands off to your platform's native Remote Desktop client. You can reach a Windows host
either through an SSM port-forwarding tunnel or as a direct connection straight to the host.

## Two ways to connect

- **Through a tunnel.** Set up a tunnel that forwards the remote RDP port (typically `3389`) to a
  local port and mark it for RDP. Start the tunnel, then click **Launch RDP**; the client opens
  against the local end of the tunnel.
- **Direct.** Add an RDP connection with a host and port and no SSM jump host. It always shows
  **Launch RDP**, since there is no tunnel to start first.

The RDP screen lists both kinds together, so every RDP target is in one place.

## Launching

Click **Launch RDP** and SSM Dojo opens your operating system's native Remote Desktop client:

- On **macOS**, Microsoft Remote Desktop (if installed).
- On **Windows**, the built-in Remote Desktop client (`mstsc`).
- On **Linux**, whatever client is registered for `.rdp` files.

Then you authenticate in the native client. If no RDP client is available, SSM Dojo shows a
platform-specific message telling you what to install.

## Credentials

By default you type your username and password in the native client, and nothing is stored.

Optionally, you can save an **RDP password** with the connection. When you do, it is encrypted using
your operating system's secure credential store (macOS Keychain, Windows Credential Manager, or the
Linux secret service), so the plain password is never written to disk. On launch, a saved password
is copied to your clipboard to paste into the client; it is not embedded in the `.rdp` file. A
per-row **Copy password** action is there if you need it again without relaunching. If a password
cannot be read for any reason, you type it as usual.

::: warning Saving passwords
Saved-password encryption relies on your OS credential store, which is available in the desktop app.
Prefer typing credentials in the native client if you are not comfortable storing them.
:::

## Managing connections

Edit or delete an RDP connection from its row, and deleting asks for confirmation first. A tunnel
that appears here because it is marked for RDP is managed on the [Tunnels](/features/tunnels)
screen, so its Edit takes you there.

## Requirements

- A native RDP client installed (for example **Microsoft Remote Desktop** on macOS, the built-in
  client on Windows).
- For a tunnel-based connection, a started tunnel forwarding the target's RDP port.

See [Security & privacy](/reference/security) for how saved credentials are protected.

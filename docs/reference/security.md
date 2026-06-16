# Security & privacy

SSM Dojo is built to keep your access local and your secrets safe. This page explains what that
means for you.

## Everything runs locally

SSM Dojo runs entirely on your computer. It isn't a hosted service and it doesn't phone home — the
only network calls it makes are to **AWS**, using **your** credentials, to do the things you ask
(list instances, start sessions, transfer files). Your credentials, connections, and files are
never sent to any third party.

## Not exposed to your network

The app's internal engine listens only on your own machine (loopback) — it isn't reachable from
your network or the internet. On top of that, the desktop app authorizes itself to that engine
with a **fresh secret generated every time you launch**, so nothing else on your machine can drive
it.

## Your AWS credentials

SSM Dojo never stores your AWS credentials. It reads your existing profiles from `~/.aws` and uses
them directly through the official AWS tooling. If credentials are expired or need an SSO login,
the app tells you rather than failing silently.

## SSH host verification

For SSH and file transfers, SSM Dojo remembers a host's identity the first time you connect
(trust-on-first-use) and checks it on every later connection. If a host's key changes unexpectedly
— a possible man-in-the-middle — the connection is refused. If the change is legitimate (for
example, the server was rebuilt), you can reset the stored key by editing the connection.

## Secrets handling

- **SSH key passphrases** and **sudo passwords** are held in memory only while a connection is
  active, and cleared when it stops or the app restarts. They are never written to disk.
- **Saved RDP passwords** (optional) are encrypted with your operating system's secure credential
  store (macOS Keychain, Windows Credential Manager, Linux secret service). The plain password is
  never written to disk.

## What SSM Dojo can do on your machine

Because it drives real tooling on your behalf, SSM Dojo can start and stop SSM sessions, open SSH
connections, run remote file operations (including with `sudo` when you supply a password), free a
busy local port by stopping the process holding it (only after you confirm), and launch your native
RDP client. All of it is local and initiated by you; nothing is exposed to the network beyond the
AWS calls your credentials authorize.

## Good practices

- Keep the **AWS CLI** and **Session Manager Plugin** up to date.
- Scope your AWS credentials to the least privilege you need (see
  [Installation → IAM permissions](/guide/installation#prerequisites)).
- Prefer **SSO** or short-lived credentials over long-lived access keys where you can.
- Only save an RDP password if you're comfortable with it living in your OS credential store.

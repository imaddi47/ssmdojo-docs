# Changelog

Release history for SSM Dojo, newest first. Versioning follows
[Semantic Versioning](https://semver.org/). Download any release from the
[releases page](https://github.com/imaddi47/ssmdojo-docs/releases).

## v0.2.1, 2026-07-02

- The **Files**, **SSH**, **RDP**, and **Transfer History** screens now share the same padding as
  the **Tunnels** view, so the layout no longer shifts as you move between sections.

## v0.2.0, 2026-07-01

- You can now **sign in** with Google or GitHub from the account menu in the sidebar. It shows
  your profile and lets you sign out. Signing in is optional, and everything you used before still
  works without an account.
- SSM Dojo now has a **Pro** plan. Your current plan shows in the account menu, with a way to
  upgrade from Free and links to manage billing or two-factor sign-in on the web. Pro-only
  features are marked with a badge.
- **Backup & Restore** (Pro) lets you export your connections and settings to a file and bring
  them back later, on another machine, or after a reinstall. Passwords and other secrets are never
  written to the file.
- Backups are selective: pick exactly which connections to export or import instead of
  all-or-nothing, and a badge shows which ones you already have. Importing won't create
  duplicates, since it matches your existing connections and skips them by default, or overwrites
  them if you choose. **Export all** grabs everything in one click.
- Your plan now refreshes on its own. It is cached so it keeps working offline for a while, and it
  updates when you come back to the app after a purchase, so you no longer have to sign out and
  back in to pick up a new subscription.
- Fixed the sign-in hand-off on Windows and Linux when the app starts from cold.

## v0.1.8, 2026-06-17

- The **SSH** screen now lists every SSH-capable connection in one place, including tunnels that
  have SSH enabled.
- Opening a connection's **Terminal** or **Files** now connects it for you, and the status light
  turns green once it is up. There is no separate Connect step.
- The file browser has a **Select SSH Machine** picker that connects the machine you choose.
- Deleting a tunnel, SSH, or RDP connection now asks you to confirm first.

## v0.1.7, 2026-06-16

- The **SSH** and **RDP** sections now list every connection of that type, including tunnels that
  have SSH or RDP enabled.
- Added **direct RDP** connections that reach a host without an SSM tunnel.
- A new **Files** button on tunnel and SSH rows jumps straight to the file browser for that
  connection.

## v0.1.6, 2026-06-16

- Added a **Docs** link to the Help menu.
- Fixed the copyright shown in the **About** panel.

## v0.1.5, 2026-06-16

- Added an **About** panel.
- Minor and major auto-updates now ask for your consent before installing.

## v0.1.4, 2026-06-16

- More compact **Forward to** control on tunnels.
- Added a **Check for Updates** menu item.
- The app now shows its correct name.

## v0.1.3, 2026-06-15

- Smoother update delivery.
- Long tunnel addresses no longer overflow their row in the list.

## v0.1.0, 2026-06-15

The first release. Highlights by area:

**Tunnels**

- SSM port-forwarding tunnels with create, edit-in-place, start/stop/retry, and live status.
- Remote-host tunnels (reach a database or service behind an instance); create a tunnel straight
  from a discovered instance.
- Local-port conflict detection with an informed-consent prompt and a one-click free-port option.

**Instances**

- Discover EC2/SSM-managed instances with search, reachability, and SSH/tunnel badges.
- Create an SSH connection or tunnel directly from an instance.

**SSH & Terminal**

- Direct SSH connections with connect/disconnect and live status.
- A built-in terminal that survives navigation, with encrypted-key passphrase prompts and
  host-key trust-on-first-use.

**File transfers**

- A Finder-style file explorer with uploads/downloads over SSH.
- Privileged (sudo) file operations and transfers.
- Delete, overwrite confirmation, and a transfer history log.

**RDP**

- Mark a tunnel for RDP and launch your native client; optionally store credentials securely.

**Security & polish**

- The app's local connection is hardened so only SSM Dojo can use it.
- macOS auto-update and a refreshed SSM Dojo look, with UX polish throughout (combobox, custom
  checkboxes, clear buttons, copy-path, loading skeletons).

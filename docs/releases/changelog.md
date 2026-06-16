# Changelog

Release history for SSM Dojo, newest first. Versioning follows
[Semantic Versioning](https://semver.org/). Download any release from the
[releases page](https://github.com/imaddi47/ssmdojo-docs/releases).

## v0.1.5 — 2026-06-16

- Added an **About** panel.
- Minor and major auto-updates now ask for your consent before installing.

## v0.1.4 — 2026-06-16

- More compact **Forward to** control on tunnels.
- Added a **Check for Updates** menu item.
- The app now shows its correct name.

## v0.2.1 — 2026-06-15

- Reliability and packaging improvements to the release/update pipeline so updates install cleanly.

## v0.2.0 — 2026-06-15

- Version milestone opening the 0.2 line. No user-facing changes since v0.1.3.

## v0.1.3 — 2026-06-15

- Smoother update delivery.
- Long tunnel addresses no longer overflow their row in the list.

## v0.1.2 — 2026-06-15

- Maintenance release — no user-facing changes.

## v0.1.1 — 2026-06-15

- Long tunnel addresses no longer overflow their row in the list.

## v0.1.0 — 2026-06-15

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

# Changelog

Release history for SSM Dojo, newest first. This page is a curated, human-readable summary.
Per-version notes generated from conventional commits live in the repo's
[`changelog/`](https://github.com/imaddi47/ssmdojo-docs/tree/main/changelog) directory, and the
complete per-commit history is in the [source repo](https://github.com/imaddi47/ssm-manager-e2e).

Versioning follows [Semantic Versioning](https://semver.org/).

## v0.2.1 — 2026-06-15

**Fixed**

- Release pipeline now publishes a **signed DMG**, and verify + E2E are gated to manual releases (#46).

## v0.2.0 — 2026-06-15

Minor version bump opening the 0.2 line. No functional changes since v0.1.3.

## v0.1.3 — 2026-06-15

**Fixed**

- Space-free release artifact names so GitHub publishing stops colliding (#50).
- Truncate long tunnel forward addresses so the row can't overflow (#49). <Badge type="info" text="also listed under v0.1.1" />

## v0.1.2 — 2026-06-15

Maintenance release — release tooling only, no user-facing changes.

## v0.1.1 — 2026-06-15

**Fixed**

- Truncate long tunnel forward address so the row can't overflow (#49).

## v0.1.0 — 2026-06-15

The first release. Highlights by area (see the
[full v0.1.0 notes](https://github.com/imaddi47/ssmdojo-docs/blob/main/changelog/v0.1.0.md) for the
complete, per-commit list):

**Tunnels**

- SSM port-forwarding tunnels with create, edit-in-place, start/stop/retry, and real traffic metering.
- Remote-host tunnels with labeled ports; create a tunnel straight from a discovered instance.
- Local-port conflict detection with an informed-consent prompt (service, cwd, PIDs) and free-port flow.

**Instances**

- All-EC2 scan and SSM/EC2 discovery with filtering and ssh/tunnel badges.
- Create an SSH connection or tunnel directly from an instance.

**SSH & Terminal**

- Direct SSH connections with connect/disconnect and live traffic metering.
- xterm SSH terminal pane with per-tunnel connection pool, session persistence across navigation,
  encrypted-key passphrase prompts, and host-key trust-on-first-use.

**File transfers**

- Finder-style file explorer with transfers over direct SSH.
- Sudo file operations (list/delete/du) and sudo streaming download/upload.
- Delete, sticky action bar, transfer history, and overwrite confirmation.

**RDP**

- Mark a tunnel for RDP and connect via the native client; in-place start; stored encrypted credentials.

**Security**

- Lock the local server to the app — a per-launch token on every route plus session injection.
- Reject foreign-origin WebSocket connections (CSWSH protection).
- Gate the local API with a per-launch token.

**Platform & UX**

- macOS auto-update and dual CI release pipelines; rebrand to SSM Dojo with a launch splash.
- UX polish — floating combobox, custom checkboxes, clear buttons, copy-path, skeletons.

::: tip Note on patch attribution
PR #49 (tunnel address truncation) is recorded under both **v0.1.1** and **v0.1.3** in the raw
per-version notes — it shipped in the 0.1.1 patch and was carried into 0.1.3. The fix is present
from v0.1.1 onward.
:::

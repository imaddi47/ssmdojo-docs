# File transfers

SSM Dojo includes a **Finder-style file browser** for the remote machine, with uploads,
downloads, deletes, and a full transfer history — all over SSH.

## Browsing

Open **File Explorer** for a connection to list a remote directory. Listing runs over SSH; entries
show names, sizes, and types. You can navigate into directories and act on individual files.

## Transfers (upload / download)

Transfers run over SSH using **rsync when available** (real rsync 3.x), falling back to **scp**
otherwise. Connections use a per-tunnel `known_hosts` file with trust-on-first-use
(`StrictHostKeyChecking=accept-new`) and run in batch mode (no interactive prompts the app can't
answer).

- **Upload** local files/folders to the remote (recursive supported).
- **Download** remote files/folders to your machine.
- **Drag-and-drop** is supported in the browser.
- **Progress** is reported live: rsync/scp progress is parsed in-band, and scp transfers (which
  lack native progress) are metered by polling remote size.
- **Cancel** an in-flight transfer at any time.

### Overwrite checks

Before an upload, SSM Dojo runs a **remote precheck** that lists the target directory and warns you
which names already exist, so you don't clobber files by accident. The check is advisory — if it
can't list the directory, it won't block you. For downloads, you can opt into overwrite, which
replaces the local target cleanly.

## Sudo file operations

For paths your SSH user can't read or write directly, SSM Dojo supports **sudo** operations:

- **Listing, delete, and disk-usage** can run under `sudo`.
- **Sudo transfers** use a streaming pipeline over SSH (rather than plain scp/rsync) so privileged
  files can be moved.
- When a sudo password is required, you provide it in the UI; like SSH passphrases, it's held **in
  memory only** and never persisted.

## Deleting

Delete remote files or directories from the browser (with a confirmation). Deletions can also run
under sudo where needed, and every delete is recorded in the transfer history.

## Transfer history

Every upload, download, and delete is written to an append-only **history** (audit log), capped at
the most recent 500 records. Each record captures:

- When it happened, the connection name (kept even if the connection is later deleted)
- The action (`upload` / `download` / `delete`)
- The remote path and local path
- The result (`done` / `failed` / `cancelled`) and any error

Open **File Explorer → Transfer History** to review or clear it. History is stored as JSON in your
config directory — see [Configuration & data](/reference/configuration).

## Related API

File operations use `/api/tunnels/:id/files/*` (list, delete, prechecks) and `/api/transfers`
(start, list, cancel); history uses `/api/history`. See the [Server API reference](/reference/api).

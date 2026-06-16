# File transfers

SSM Dojo includes a **Finder-style file browser** for the remote machine, with uploads,
downloads, deletes, and a full transfer history — all over SSH.

## Browsing

Open **File Explorer** for a connection to list a remote directory. Entries show names, sizes, and
types. You can navigate into directories and act on individual files.

## Transfers (upload / download)

Transfers run over SSH (using `rsync` when available, otherwise `scp`). Remote hosts are pinned on
first use (trust-on-first-use), so transfers stay secure without interactive prompts.

- **Upload** local files/folders to the remote (folders included).
- **Download** remote files/folders to your machine.
- **Drag-and-drop** is supported in the browser.
- **Progress** is shown live for each transfer.
- **Cancel** an in-flight transfer at any time.

### Overwrite checks

Before an upload, SSM Dojo warns you which names already exist at the destination, so you don't
clobber files by accident. The check is advisory — it won't block you if it can't read the target
directory. For downloads, you can opt into overwrite, which replaces the local file cleanly.

## Sudo file operations

For paths your SSH user can't read or write directly, SSM Dojo supports **sudo** operations —
listing, delete, disk-usage, and transfers can run with elevated privileges. When a sudo password
is needed, you provide it in the app; like SSH passphrases, it's held **in memory only** and never
saved to disk.

## Deleting

Delete remote files or directories from the browser (with a confirmation). Deletes can run under
sudo where needed, and every delete is recorded in the transfer history.

## Transfer history

Every upload, download, and delete is written to a transfer **history** (an audit log), keeping the
most recent records. Each entry captures:

- When it happened and which connection it was on (kept even if the connection is later deleted)
- The action (upload / download / delete)
- The remote and local paths
- The result (done / failed / cancelled) and any error

Open **File Explorer → Transfer History** to review or clear it. See
[Your data & settings](/reference/configuration) for where it's stored.

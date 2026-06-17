# File transfers

SSM Dojo includes a Finder-style file browser for the remote machine, with uploads, downloads,
deletes, and a full transfer history, all over SSH.

## Choosing a machine

The browser has a picker that lists every SSH-capable connection, whether it is connected or not.
Choose one from the "Select SSH Machine" dropdown. If the machine is not connected yet, selecting it
connects it for you, and its files load once it is up. You can also arrive here from the **Files**
button on a tunnel or SSH row, which picks and connects that machine on the way in.

## Browsing

Once a machine is connected, the browser lists a remote directory. Entries show names, sizes, and
types. You can navigate into directories and act on individual files.

## Transfers (upload / download)

Transfers run over SSH (using `rsync` when available, otherwise `scp`). Remote hosts are pinned on
first use (trust-on-first-use), so transfers stay secure without interactive prompts.

- **Upload** local files and folders to the remote.
- **Download** remote files and folders to your machine.
- **Drag-and-drop** works in the browser.
- **Progress** is shown live for each transfer.
- **Cancel** an in-flight transfer at any time.

### Overwrite checks

Before an upload, SSM Dojo warns you which names already exist at the destination, so you do not
clobber files by accident. The check is advisory: it will not block you if it cannot read the target
directory. For downloads, you can opt into overwrite, which replaces the local file cleanly.

## Sudo file operations

For paths your SSH user cannot read or write directly, SSM Dojo can run operations under **sudo**:
listing, delete, disk-usage, and transfers can all use elevated privileges. When a sudo password is
needed, you enter it in the app. Like SSH passphrases, it is held in memory only and never saved to
disk.

## Deleting

Delete remote files or directories from the browser, with a confirmation first. Deletes can run
under sudo where needed, and every delete is recorded in the transfer history.

## Transfer history

Every upload, download, and delete is written to a transfer history (an audit log) that keeps the
most recent records. Each entry captures:

- When it happened and which connection it was on (kept even if the connection is later deleted)
- The action (upload, download, or delete)
- The remote and local paths
- The result (done, failed, or cancelled) and any error

Open **File Explorer → Transfer History** to review or clear it. See
[Your data & settings](/reference/configuration) for where it is stored.

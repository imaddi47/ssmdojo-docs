# Your data & settings

SSM Dojo keeps everything **on your machine**. There's no account, no database, and no cloud sync.
Your settings, saved connections, and history live in local files, and your AWS credentials are
read from your existing AWS configuration.

## Where your data lives

SSM Dojo stores its files in your operating system's standard app-data location:

| OS | Folder |
| --- | --- |
| **macOS** | `~/Library/Application Support/ssm-manager/` |
| **Linux** | `~/.config/ssm-manager/` |
| **Windows** | `%APPDATA%\ssm-manager\` |

Inside that folder you'll find:

| What | Contents |
| --- | --- |
| **Settings** | Your preferences (theme, accent, default profile/region, log level, download folder). |
| **Connections** | Your saved tunnels and SSH connections. |
| **Transfer history** | A log of recent uploads, downloads, and deletes. |
| **Saved RDP passwords** | Encrypted with your OS credential store (never stored in plain text). |
| **Known hosts** | Pinned SSH host keys for trust-on-first-use. |

To **reset** SSM Dojo to a clean state, quit the app and remove that folder. To **back up** your
connections, copy it.

## Settings

You can change these on the **Settings** screen (see [Settings & theming](/features/settings)):

- **Theme**: `system`, `light`, or `dark`.
- **Accent**: `violet` or `teal`.
- **Default profile / region**: pre-selected on launch so you don't re-pick them.
- **Log level**: how verbose the app's logs are.
- **Download folder**: default destination for file downloads.

## AWS credentials

SSM Dojo does **not** store your AWS credentials. It reads your named profiles from the standard
`~/.aws/config` and `~/.aws/credentials` files (including SSO and assume-role) and uses them
directly. If a profile's credentials are expired or need an SSO login, SSM Dojo tells you.

## Secrets

- **Saved RDP passwords** (optional) are encrypted using your OS credential store. The plain text
  is never written to disk.
- **SSH key passphrases** and **sudo passwords** are kept in memory only while a connection is
  active, and are cleared when the connection stops or the app restarts; they're never saved.

See [Security & privacy](/reference/security) for the full picture.

# Configuration & data

SSM Dojo stores its state as plain files in your OS config directory. There's no database and no
cloud sync — everything is local to your machine.

## Config directory

The location is resolved per-OS (via `env-paths` for the app id `ssm-manager`):

| OS | Path |
| --- | --- |
| **macOS** | `~/Library/Application Support/ssm-manager/` |
| **Linux** | `~/.config/ssm-manager/` |
| **Windows** | `%APPDATA%\ssm-manager\` |

## Files

| File | Contents |
| --- | --- |
| `settings.json` | User preferences (theme, accent, default profile/region, log level, download dir). |
| `tunnels.json` | All tunnel/connection definitions. |
| `history.json` | Append-only transfer/delete audit log (most recent 500). |
| `secrets.json` | Encrypted RDP passwords, keyed by tunnel (OS-keychain encrypted). |
| `known_hosts/<tunnelId>` | Per-connection pinned SSH host keys (trust-on-first-use). |

Writes are **atomic** (write to a temp file, then rename) and serialized, so concurrent updates
can't corrupt a file or lose an update.

## Settings schema

```ts
interface Settings {
  theme: 'system' | 'light' | 'dark'
  accent: 'violet' | 'teal'
  defaultProfile: string | null
  defaultRegion: string | null
  logLevel: 'error' | 'warn' | 'info' | 'debug'
  downloadDir: string | null
}
```

## Tunnel definition schema

```ts
interface TunnelDefinition {
  id: string                          // assigned by the server
  name: string
  profile: string                     // AWS profile
  region: string                      // AWS region
  target: string                      // instance ID (or host)
  mode: 'instance' | 'remote-host'
  localPort: number                   // 1–65535
  remotePort: number                  // 1–65535
  remoteHost?: string                 // for mode === 'remote-host'
  autoReconnect: boolean
  ssh?: { user: string; keyPath?: string }
  hostKey?: string                    // pinned SSH host key (TOFU)
  createdAt: string                   // ISO 8601
}
```

## AWS credentials

SSM Dojo does **not** store AWS credentials. It reads named profiles from your standard
`~/.aws/config` and `~/.aws/credentials` files, and resolves them through the AWS SDK's credential
providers (including SSO and assume-role). Expired or login-required credentials are detected and
surfaced in the UI.

## Secrets and passphrases

- **RDP passwords** (optional) are encrypted with your OS keychain via Electron `safeStorage`
  (macOS Keychain / Windows DPAPI / Linux libsecret) and stored in `secrets.json`. Plaintext is
  never written to disk.
- **SSH passphrases** and **sudo passwords** are held **in memory only** for the life of a
  connection. They're cleared when the connection is stopped, its config changes, the tunnel is
  deleted, or the app restarts — and never persisted.

See the [Security model](/reference/security) for the full picture.

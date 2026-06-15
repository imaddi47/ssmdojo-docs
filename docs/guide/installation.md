# Installation

SSM Dojo ships as a desktop app for macOS, Linux, and Windows. You can also run it as a
local web app from source.

## Prerequisites

These are required at runtime — SSM Dojo shells out to the official AWS tooling:

| Requirement | Why | Install |
| --- | --- | --- |
| **AWS CLI v2** | Starts and manages SSM sessions | [AWS CLI v2 install guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) |
| **AWS Session Manager Plugin** | The agent that actually runs port-forwarding and terminal sessions | [Session Manager Plugin install guide](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html) |
| **AWS credentials** | Resolves profiles, regions, and permissions | Configure `~/.aws/config` + `~/.aws/credentials` (named profiles, SSO, or assume-role) |

SSM Dojo checks for the AWS CLI and Session Manager Plugin on startup and warns you if either
is missing — tunnels cannot start without them. On the desktop app, SSM Dojo augments its
`PATH` with common locations (Homebrew, etc.) and your login shell's `PATH`, so tools installed
in non-default locations are usually found.

::: warning IAM permissions
Your AWS credentials need permission to call Systems Manager and EC2 (e.g.
`ssm:StartSession`, `ssm:DescribeInstanceInformation`, `ec2:DescribeInstances`) and to use the
SSM port-forwarding documents. Target instances must have the SSM Agent running and an
instance profile that allows Session Manager.
:::

## Desktop app

### macOS

1. Download the `.dmg` from the [releases page](https://github.com/imaddi47/ssmdojo-docs/releases).
2. Open the DMG and drag **SSM Dojo** to **Applications**.
3. Launch it.

Signed & notarized builds open with no extra steps. The app also auto-updates itself from the
releases feed.

::: warning Unsigned pre-release builds only
If you receive an **unsigned** pre-release DMG (over Slack/AirDrop/direct download), macOS
quarantines it and Apple Silicon may show **"SSM Dojo is damaged and can't be opened."** The app
is **not** damaged — it's an unsigned build, and macOS offers no "Open Anyway" button for this
case. Drag the app to `/Applications`, then run once:

```bash
xattr -dr com.apple.quarantine "/Applications/SSM Dojo.app"
```

Signed/notarized releases don't need this step.
:::

### Linux

Download the **AppImage** (portable) or the **`.deb`** package from the
[releases page](https://github.com/imaddi47/ssmdojo-docs/releases). For the AppImage, mark it
executable and run it:

```bash
chmod +x SSM-Dojo-*.AppImage
./SSM-Dojo-*.AppImage
```

### Windows

Download and run the **NSIS installer** (`.exe`) from the
[releases page](https://github.com/imaddi47/ssmdojo-docs/releases).

## Auto-update

Packaged desktop builds check the releases feed and update themselves in the background. On
macOS this uses the notarized `.zip` published alongside the `.dmg`. No action is needed beyond
restarting the app when prompted.

## Run from source (web / development)

For local development or to run the web app:

```bash
# Prerequisites: Node 20+ and pnpm 10+ (corepack enable)
git clone https://github.com/imaddi47/ssm-manager-e2e.git
cd ssm-manager-e2e
pnpm install
pnpm dev        # runs all packages in watch mode (server + Vite UI + Electron)
```

Useful scripts:

| Command | What it does |
| --- | --- |
| `pnpm dev` | Run every package in watch mode |
| `pnpm build` | Build all packages (`turbo run build`) |
| `pnpm test` | Run the unit test suite (Vitest) |
| `pnpm test:e2e` | Run end-to-end tests (Playwright) |
| `pnpm typecheck` / `pnpm lint` | Static checks |

To produce desktop installers locally, build first, then package the desktop app with
electron-builder (see [Release process](/releases/release-process)).

Next: [Quickstart](/guide/quickstart).

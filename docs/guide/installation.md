# Installation

SSM Dojo ships as a desktop app for macOS, Linux, and Windows. Download it from the
[releases page](https://github.com/imaddi47/ssmdojo-docs/releases).

## Prerequisites

These are required at runtime. SSM Dojo uses the official AWS tooling:

| Requirement | Why | Install |
| --- | --- | --- |
| **AWS CLI v2** | Starts and manages SSM sessions | [AWS CLI v2 install guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) |
| **AWS Session Manager Plugin** | Runs port-forwarding and terminal sessions | [Session Manager Plugin install guide](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html) |
| **AWS credentials** | Resolves your profiles, regions, and permissions | Configure `~/.aws/config` + `~/.aws/credentials` (named profiles, SSO, or assume-role) |

SSM Dojo checks for the AWS CLI and Session Manager Plugin on startup and warns you if either is
missing. Tunnels can't start without them. The app also looks in common install locations and
honors your login shell's `PATH`, so tools installed in non-default places are usually found.

::: warning IAM permissions
Your AWS credentials need permission to call Systems Manager and EC2. For example:
`ssm:StartSession`, `ssm:DescribeInstanceInformation`, and `ec2:DescribeInstances`. You also need to use
the SSM port-forwarding documents. Target instances must have the SSM Agent running and an
instance profile that allows Session Manager.
:::

::: tip Parameter Store permissions
To use the **Parameters** view, add the relevant Parameter Store permissions to the selected
profile: `ssm:DescribeParameters`, `ssm:GetParameter`, `ssm:PutParameter`,
`ssm:DeleteParameter`, and the tag operations it needs. Reading a `SecureString` requires
`kms:Decrypt`; writing one requires KMS encrypt or data-key permission for its key. See
[Parameter Store](/features/parameters#iam-permissions) for the full action list.
:::

## macOS

1. Download the `.dmg` from the [releases page](https://github.com/imaddi47/ssmdojo-docs/releases).
2. Open the DMG and drag **SSM Dojo** to **Applications**.
3. Launch it.

Signed and notarized builds open with no extra steps, and the app keeps itself up to date
automatically.

::: warning Unsigned pre-release builds only
If you receive an **unsigned** pre-release DMG (over Slack/AirDrop/direct download), macOS
quarantines it and Apple Silicon may show **"SSM Dojo is damaged and can't be opened."** The app
is **not** damaged. It's an unsigned build, and macOS offers no "Open Anyway" button for this
case. Drag the app to `/Applications`, then run once:

```bash
xattr -dr com.apple.quarantine "/Applications/SSM Dojo.app"
```

Signed/notarized releases don't need this step.
:::

## Linux

Download the **AppImage** (portable) or the **`.deb`** package from the
[releases page](https://github.com/imaddi47/ssmdojo-docs/releases). For the AppImage, mark it
executable and run it:

```bash
chmod +x SSM-Dojo-*.AppImage
./SSM-Dojo-*.AppImage
```

## Windows

Download and run the **installer** (`.exe`) from the
[releases page](https://github.com/imaddi47/ssmdojo-docs/releases).

## Automatic updates

The desktop app checks for new releases on launch and periodically after that, downloads them in the
background, and prompts you to restart. See [Updating](/guide/updates) for the full behavior,
including how patch and larger releases differ and how to check on demand.

Next: [Quickstart](/guide/quickstart).

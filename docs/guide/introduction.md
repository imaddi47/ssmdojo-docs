# Introduction

**SSM Dojo** is a cross-platform desktop client for AWS Systems Manager. It turns the
fiddly `aws ssm start-session` workflow into a fast, card-based app for:

- **Tunnels** — SSM port-forwarding sessions to an instance or a remote host behind it (the primary feature).
- **Instances** — discovering EC2/SSM-managed instances and acting on them.
- **SSH & Terminal** — direct SSH connections with a live terminal.
- **File transfers** — a Finder-style browser with file uploads and downloads over SSH.
- **RDP** — handing a tunnel off to your platform's native Remote Desktop client.

## How it works

SSM Dojo runs **entirely on your machine** — as a desktop app on macOS, Linux, and Windows.
Under the hood it drives the official AWS tooling (the AWS CLI and Session Manager Plugin) using
your own AWS credentials, and connects to your instances through AWS Systems Manager.

Nothing you do is sent to any third-party service: your credentials, connections, and files stay
between your computer and AWS. See [Security & privacy](/reference/security) for the details.

## What you need

SSM Dojo uses the official AWS tooling, so you need:

- **AWS CLI v2** and the **AWS Session Manager Plugin** installed (required to start sessions).
- **AWS credentials** in `~/.aws` — named profiles, SSO, or assume-role all work.

See [Installation](/guide/installation) for setup, then [Quickstart](/guide/quickstart) to
open your first tunnel.

## Who it's for

Anyone who reaches EC2 instances through Session Manager and is tired of juggling CLI flags,
local ports, and SSH keys — engineers, SREs, and support teams who want tunnels, shells, file
transfers, and RDP behind one approachable app.

::: tip Documentation scope
This site documents the released SSM Dojo desktop app — how to install and use it. See the
[Changelog](/releases/changelog) for what shipped in each version.
:::

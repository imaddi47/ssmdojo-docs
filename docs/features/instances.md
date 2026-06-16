# Instances

The **Instances** view discovers the EC2 instances available to you in the selected profile and
region, so you can act on them without copying instance IDs around.

## Discovery

SSM Dojo combines AWS Systems Manager and EC2 data to show, per instance:

- Instance ID and **Name** tag
- Instance type, availability zone, private IP, VPC
- **SSM reachability** (whether the instance is reachable via Session Manager)
- Platform (Linux/Windows) and instance state

## Scan scope

You can scan **all EC2 instances** or just SSM-managed ones. Only SSM-reachable instances can be
targeted for tunnels/sessions, but seeing all instances helps you spot ones that aren't yet
managed.

## Filtering

Use the filter box to narrow the list — it matches on the instance ID or Name tag
(case-insensitive).

## Acting on an instance

From an instance you can:

- **Create a tunnel** — opens the tunnel form with the target pre-filled. See [Tunnels](/features/tunnels).
- **Create an SSH connection** — set up a direct SSH connection. See [SSH & Terminal](/features/ssh-and-terminal).

Badges on each instance show whether it already has SSH or tunnel connections defined, so you can
tell at a glance what's already wired up.

::: tip Profile + region required
Discovery is scoped to the profile and region selected in the top bar. If the list is empty,
confirm your credentials are valid for that profile (SSO may need `aws sso login`) and that
instances in that region have the SSM Agent running.
:::

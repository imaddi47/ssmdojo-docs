---
layout: home

hero:
  name: SSM Dojo
  text: AWS Systems Manager, made approachable
  tagline: Port-forwarding tunnels, Parameter Store, SSH, file transfer, and RDP. One fast desktop app for macOS, Linux, and Windows.
  image:
    src: /logo.svg
    alt: SSM Dojo
  actions:
    - theme: brand
      text: Get started
      link: /guide/introduction
    - theme: alt
      text: Installation
      link: /guide/installation

features:
  - icon: 🔌
    title: Tunnels first
    details: Start AWS SSM port-forwarding sessions to an instance or a remote host behind it. Edit in place, retry on failure, and let SSM Dojo resolve local-port conflicts for you.
    link: /features/tunnels
    linkText: Tunnels
  - icon: 🖥️
    title: Instances at a glance
    details: Scan EC2/SSM-managed instances per profile and region, filter by name or ID, and spin up a tunnel or SSH connection straight from a discovered instance.
    link: /features/instances
    linkText: Instances
  - icon: 🧩
    title: Parameter Store
    details: Manage SSM parameters in your selected profile and region. Pro keeps encrypted local revisions and lets you compare any two values with a Git-style diff.
    link: /features/parameters
    linkText: Parameter Store
  - icon: 🐚
    title: SSH & live terminal
    details: Direct SSH connections with an xterm terminal that survives navigation, host-key trust-on-first-use, and interactive passphrase prompts.
    link: /features/ssh-and-terminal
    linkText: SSH & Terminal
  - icon: 📁
    title: File transfers
    details: A Finder-style browser with rsync/scp transfers over SSH, sudo file operations, overwrite checks, drag-and-drop, and a transfer history audit log.
    link: /features/file-transfers
    linkText: File transfers
  - icon: 🪟
    title: RDP handoff
    details: Mark a tunnel for RDP and launch your platform's native client, with optional OS-keychain-encrypted credentials.
    link: /features/rdp
    linkText: RDP
  - icon: 🔒
    title: Secure by design
    details: The engine runs on a loopback-only local server, gated by a fresh per-launch token. Secrets live in your OS keychain; nothing privileged is exposed to the network.
    link: /reference/security
    linkText: Security model
---

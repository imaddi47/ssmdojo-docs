# Release process

This page documents how SSM Dojo desktop builds are cut and published. It's aimed at maintainers.
End users just download from the [releases page](https://github.com/imaddi47/ssmdojo-docs/releases)
and let the app auto-update.

## Overview

Releases are produced by a CI pipeline (triggered manually) that bumps the version, builds and
signs the desktop app on macOS, and publishes artifacts to the GitHub releases feed that the app's
auto-updater reads. The source repo's `docs/RELEASE.md` and `scripts/release/` hold the canonical
scripts.

## Steps

1. **Bump & tag** — `scripts/release/bump-version.sh` bumps the desktop package version, commits
   `chore(release): X.Y.Z`, tags `vX.Y.Z`, and pushes.
2. **Build, sign, notarize** — electron-builder builds on macOS, signs with the Developer ID,
   then notarizes and staples the `.app` and `.dmg`.
3. **Publish** — uploads the `.dmg`, the auto-update `.zip`, and `latest-mac.yml` to the public
   releases feed.
4. **Changelog** — release notes are rendered from conventional commits.

## Artifacts & targets

electron-builder (`packages/desktop/electron-builder.yml`, app id `com.toddle.ssm-manager`) builds:

| Platform | Artifacts |
| --- | --- |
| macOS | `.dmg` (install) + `.zip` (auto-update) |
| Windows | NSIS installer (`.exe`) |
| Linux | AppImage + `.deb` |

## Auto-update feed

Packaged builds auto-update from the GitHub releases of **`imaddi47/ssmdojo-docs`** (this repo). On
macOS the updater applies the notarized `.zip` published alongside the `.dmg`; `latest-mac.yml`
describes the latest version. The feed is public — no auth needed to check for updates.

## Signing & notarization (macOS)

CI provides signing material via secrets/credentials:

| Purpose | Secret |
| --- | --- |
| Developer ID certificate (base64 `.p12`) | `CSC_LINK` |
| Certificate password | `CSC_KEY_PASSWORD` |
| App Store Connect API key (contents) | `APPLE_API_KEY_P8` |
| API key ID | `APPLE_API_KEY_ID` |
| API issuer | `APPLE_API_ISSUER` |
| Apple team ID | `APPLE_TEAM_ID` |
| GitHub token (contents:write on the release repo) | `RELEASE_GH_TOKEN` |

Without signing material, electron-builder produces an **unsigned** build (fine for local dev). See
[Installation → macOS](/guide/installation#macos) for the quarantine workaround unsigned builds
need.

## Conventions

- **Versioning:** [SemVer](https://semver.org/) — breaking → major, feature → minor, fix → patch.
- **Commits:** conventional commits (`feat`, `fix`, `chore`, …); release notes are generated from them.
- **Changelog:** per-version notes are kept in this repo's [`changelog/`](https://github.com/imaddi47/ssmdojo-docs/tree/main/changelog) directory and summarized on the [Changelog](/releases/changelog) page.

::: warning Don't hand-publish
Build, sign, and tag through the pipeline. Publishing a release is an outward-facing action —
get sign-off before pushing tags or publishing artifacts.
:::

# Updating

The standalone and macOS builds keep themselves current. This page explains when they check, what
happens when a new version is found, and how to update on demand.

::: info Microsoft Store installs
If you installed from the Microsoft Store, updates come through the Store, not the in-app updater,
so the behavior on this page does not apply to that build.
:::

## When it checks

SSM Dojo checks for a new version when it starts, and then about every six hours while it stays
open. It reads the public releases feed, so it only sees versions that have actually been published.
Checking is a poll on that schedule, not an instant push, so a brand-new release is picked up at the
next check rather than the moment it goes live.

## What happens when an update is found

It depends on how big the change is:

- **Patch release** (for example 0.1.7 to 0.1.8): SSM Dojo downloads it in the background and then
  shows **Update ready, restart to apply** with a **Restart** button. Restart when it suits you.
- **Minor or major release** (for example 0.1.x to 0.2.0): SSM Dojo shows an **Install** prompt
  first and waits for you to click it before downloading, then asks you to restart. You get a
  heads-up before a larger change lands.

Either way, nothing installs until you restart, and a downloaded update also applies the next time
you quit the app.

## Check on demand

To check right now, use **Help → Check for Updates** (it is in the app menu too). SSM Dojo runs an
immediate check and tells you whether you are up to date or a new version is on the way.

## Getting an update sooner

If a new version is out and you do not want to wait for the next poll:

- Use **Check for Updates** from the menu, or
- Quit and reopen the app to run a fresh check on start.

On macOS, closing the window with the red button does not quit the app; it keeps running in the
dock, so reopening the window does not trigger a new check. Use **Cmd+Q** and relaunch, or the menu,
to force one.

## Manual download

You can always download any build directly from the
[releases page](https://github.com/imaddi47/ssmdojo-docs/releases) and install it over your current
version.

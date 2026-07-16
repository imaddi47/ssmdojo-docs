# Settings & theming

The **Settings** screen holds app-wide preferences. They're persisted to `settings.json` in your
config directory (see [Configuration & data](/reference/configuration)).

## Available settings

| Setting | Values | Notes |
| --- | --- | --- |
| **Theme** | `system`, `light`, `dark` | `system` follows your OS appearance. |
| **Default profile** | any AWS profile, or none | Pre-selected in the top bar on launch. |
| **Default region** | any region, or none | Pre-selected in the top bar on launch. |
| **Download directory** | a path, or none | Default destination for file downloads. Empty uses `~/Downloads`. |
| **SSH keys folder** | a path, or none | Folder scanned for the SSH key picker's suggestions. Empty uses `~/.ssh`. |
| **Log level** | `error`, `warn`, `info`, `debug` | How verbose the engine logs are. |

The **Download directory** and **SSH keys folder** fields each have a **Browse** button that opens
your native file dialog, so you can pick a folder instead of typing or pasting a path.

## Theming

SSM Dojo ships light and dark themes built on CSS-variable design tokens, with its signature teal
accent. Choosing **system** matches your OS appearance automatically and switches live when your OS
toggles between light and dark.

## Defaults that save clicks

Setting a **default profile** and **default region** means SSM Dojo opens ready to work. No need
to re-pick them in the top bar each launch. This is the quickest win after installing.

Where settings are stored is covered in [Your data & settings](/reference/configuration).

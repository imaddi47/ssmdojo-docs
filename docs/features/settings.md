# Settings & theming

The **Settings** screen holds app-wide preferences. They're persisted to `settings.json` in your
config directory (see [Configuration & data](/reference/configuration)).

## Available settings

| Setting | Values | Notes |
| --- | --- | --- |
| **Theme** | `system`, `light`, `dark` | `system` follows your OS appearance. |
| **Accent** | `violet`, `teal` | Brand accent color used across the UI. |
| **Default profile** | any AWS profile, or none | Pre-selected in the top bar on launch. |
| **Default region** | any region, or none | Pre-selected in the top bar on launch. |
| **Log level** | `error`, `warn`, `info`, `debug` | How verbose the engine logs are. |
| **Download directory** | a path, or none | Default destination for file downloads. |

## Theming

SSM Dojo ships light and dark themes built on CSS-variable design tokens, with a violet or teal
accent. Choosing **system** matches your OS appearance automatically and switches live when your OS
toggles between light and dark.

## Defaults that save clicks

Setting a **default profile** and **default region** means SSM Dojo opens ready to work — no need
to re-pick them in the top bar each launch. This is the quickest win after installing.

## Related API

Settings are read/written via `GET /api/settings` and `PUT /api/settings`. See the
[Server API reference](/reference/api).

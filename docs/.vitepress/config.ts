import { defineConfig } from 'vitepress'

// SSM Dojo documentation site (public).
// This site documents how to USE the app. It intentionally contains no
// internal/source-code details about the (private) implementation.
//
// Deployed to GitHub Pages with the custom domain docs.ssmdojo.com (served at
// the root), so `base` is '/'. The custom domain is pinned via docs/public/CNAME.
// If you ever drop the custom domain and use the project URL
// (https://imaddi47.github.io/ssmdojo-docs/), set base to '/ssmdojo-docs/'.
export default defineConfig({
  base: '/',
  title: 'SSM Dojo',
  description:
    'Cross-platform AWS Systems Manager client — port-forwarding tunnels, SSH, file transfer, and RDP, in a fast desktop app.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#080c0b' }],
    ['meta', { name: 'og:title', content: 'SSM Dojo Documentation' }],
    [
      'meta',
      {
        name: 'og:description',
        content:
          'Tunnels, SSH, file transfer, and RDP for AWS Systems Manager — one desktop app.',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Features', link: '/features/tunnels' },
      { text: 'Security & data', link: '/reference/security' },
      { text: 'Changelog', link: '/releases/changelog' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quickstart', link: '/guide/quickstart' },
            { text: 'Core concepts', link: '/guide/concepts' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          ],
        },
      ],
      '/features/': [
        {
          text: 'Features',
          items: [
            { text: 'Tunnels', link: '/features/tunnels' },
            { text: 'Instances', link: '/features/instances' },
            { text: 'SSH & Terminal', link: '/features/ssh-and-terminal' },
            { text: 'File transfers', link: '/features/file-transfers' },
            { text: 'RDP', link: '/features/rdp' },
            { text: 'Settings & theming', link: '/features/settings' },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Security & data',
          items: [
            { text: 'Security & privacy', link: '/reference/security' },
            { text: 'Your data & settings', link: '/reference/configuration' },
          ],
        },
      ],
      '/releases/': [
        {
          text: 'Releases',
          items: [{ text: 'Changelog', link: '/releases/changelog' }],
        },
      ],
    },

    search: { provider: 'local' },

    footer: {
      message: 'Documentation for SSM Dojo.',
      copyright: 'SSM Dojo — AWS Systems Manager, made approachable.',
    },
  },
})

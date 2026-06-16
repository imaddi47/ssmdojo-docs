import { defineConfig } from 'vitepress'

// SSM Dojo documentation site (public).
// This site documents how to USE the app. It intentionally contains no
// internal/source-code details about the (private) implementation.
//
// Deployed to GitHub Pages as a project site at
// https://imaddi47.github.io/ssmdojo-docs/ , so `base` is '/ssmdojo-docs/'.
// If you move to a custom domain served at the root, change base back to '/'.
export default defineConfig({
  base: '/ssmdojo-docs/',
  title: 'SSM Dojo',
  description:
    'Cross-platform AWS Systems Manager client — port-forwarding tunnels, SSH, file transfer, and RDP, in a fast desktop app.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#7c5cff' }],
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

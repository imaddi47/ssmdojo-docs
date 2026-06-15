import { defineConfig } from 'vitepress'

// SSM Dojo documentation site.
// `base` is '/' by default. If you deploy to GitHub Pages as a *project* site
// (e.g. https://imaddi47.github.io/ssmdojo-docs/), set base to '/ssmdojo-docs/'.
export default defineConfig({
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
      { text: 'Reference', link: '/reference/architecture' },
      {
        text: 'Releases',
        items: [
          { text: 'Changelog', link: '/releases/changelog' },
          { text: 'Release process', link: '/releases/release-process' },
        ],
      },
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
          text: 'Reference',
          items: [
            { text: 'Architecture', link: '/reference/architecture' },
            { text: 'Server API', link: '/reference/api' },
            { text: 'Configuration & data', link: '/reference/configuration' },
            { text: 'Security model', link: '/reference/security' },
          ],
        },
      ],
      '/releases/': [
        {
          text: 'Releases',
          items: [
            { text: 'Changelog', link: '/releases/changelog' },
            { text: 'Release process', link: '/releases/release-process' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/imaddi47/ssm-manager-e2e' },
    ],

    search: { provider: 'local' },

    editLink: {
      pattern:
        'https://github.com/imaddi47/ssmdojo-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Documentation for SSM Dojo.',
      copyright: 'SSM Dojo — AWS Systems Manager, made approachable.',
    },
  },
})

module.exports = {
  title: 'useWorker',
  tagline: 'Use web worker with github hooks',
  url: 'https://useworker.netlify.com/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'alewin', // Usually your GitHub org/user name.
  projectName: 'useWorker', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'useWorker',
      logo: {
        alt: 'useWorker',
        src: 'https://github.com/alewin/useWorker/raw/develop/logo.png',
      },
      links: [
        {
          to: 'docs/introduction',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/alewin/useWorker',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'introduction',
              to: 'docs/introduction',
            },
            {
              label: 'Installation',
              to: 'docs/installation',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/alewin/useworker',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}, Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/alewin/useworker/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}

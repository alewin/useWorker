module.exports = {
  title: 'useWorker',
  tagline: 'Use web workers with react hook',
  url: 'https://useworker.netlify.com/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'alewin',
  projectName: 'useWorker',
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-160695625-2',
      anonymizeIP: true,
    },
    navbar: {
      title: 'useWorker',
      logo: {
        alt: 'useWorker',
        src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/gear_2699.png',
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
            {
              label: 'API',
              to: 'docs/api-useworker',
            },
            {
              label: 'Examples',
              to: 'docs/examples/examples-sort',
            },
            {
              label: 'Limitations',
              to: 'docs/limitations',
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
    prism: {
      defaultLanguage: 'js',
      plugins: ['line-numbers', 'show-language'],
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

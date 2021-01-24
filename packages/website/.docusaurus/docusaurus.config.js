export default {
  "title": "useWorker",
  "tagline": "Use web workers with react hook",
  "url": "https://useworker.netlify.com/",
  "baseUrl": "/",
  "favicon": "img/favicon.ico",
  "organizationName": "alewin",
  "projectName": "useWorker",
  "themeConfig": {
    "googleAnalytics": {
      "trackingID": "UA-160695625-2",
      "anonymizeIP": true
    },
    "navbar": {
      "title": "useWorker",
      "logo": {
        "alt": "useWorker",
        "src": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/gear_2699.png"
      },
      "items": [
        {
          "to": "docs/introduction",
          "activeBasePath": "docs",
          "label": "Docs",
          "position": "left"
        },
        {
          "href": "https://github.com/alewin/useWorker",
          "label": "GitHub",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {
              "label": "introduction",
              "to": "docs/introduction"
            },
            {
              "label": "Installation",
              "to": "docs/installation"
            },
            {
              "label": "API",
              "to": "docs/api-useworker"
            },
            {
              "label": "Examples",
              "to": "docs/examples/examples-sort"
            },
            {
              "label": "Limitations",
              "to": "docs/limitations"
            }
          ]
        },
        {
          "title": "Social",
          "items": [
            {
              "label": "GitHub",
              "href": "https://github.com/alewin/useworker"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2021, Built with Docusaurus."
    },
    "prism": {
      "defaultLanguage": "js",
      "plugins": [
        "line-numbers",
        "show-language"
      ],
      "additionalLanguages": []
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "hideableSidebar": false
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/prova/git/useWorker/packages/website/sidebars.js",
          "editUrl": "https://github.com/alewin/useworker/edit/master/website/"
        },
        "theme": {
          "customCss": "/Users/prova/git/useWorker/packages/website/src/css/custom.css"
        }
      }
    ]
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};
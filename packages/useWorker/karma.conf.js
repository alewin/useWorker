module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "chai", "detectBrowsers"],
    files: [{ pattern: "test/*.test.js" }],
    preprocessors: {
      "test/*.test.js": ["webpack"], //preprocess with webpack
    },
    reporters: ["dots"], //report results in this format
    webpack: {
      devtool: "inline-source-map", //just do inline source maps instead of the default
      module: {
        rules: [
          {
            test: /test\.js$/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: {
                        esmodules: true,
                      },
                    },
                  ],
                ],
                plugins: [
                  "@babel/plugin-transform-react-jsx",
                  "@babel/plugin-proposal-optional-chaining",
                ],
              },
            },
          },
        ],
      },
    },
    reporters: ["progress"],
    singleRun: true,
    port: 9876, // Karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      preferHeadless: true,
      postDetection: (availableBrowsers) => {
        if (process.env.INSIDE_DOCKER) {
          return ["DockerChrome"];
        } else if (process.env.CHROME_ONLY) {
          return ["ChromeHeadless"];
        } else {
          // Filtering SafariTechPreview because I am having
          // local issues and I have no idea how to fix them.
          // I know that’s not a good reason to disable tests,
          // but Safari TP is relatively unimportant.
          return availableBrowsers.filter(
            (browser) => browser !== "SafariTechPreview"
          );
        }
      },
    },
    customLaunchers: {
      DockerChrome: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    autoWatch: false,
    concurrency: Infinity,
  });
};

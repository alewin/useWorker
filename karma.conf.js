module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "chai"],
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
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadless"],
    autoWatch: false,
    concurrency: Infinity,
  });
};

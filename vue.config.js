/* eslint-disable @typescript-eslint/no-var-requires */

const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

module.exports = {
  configureWebpack: {
    devtool: 'cheap-module-source-map',
    plugins: [
      new ChromeExtensionReloader({
        entries: {
          contentScript: ['lobbyContentScripts'],
          background: 'background.js',
          extensionPage: ['popup', 'options', /* and so on ... */],
        }
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'manifest.json'
          },
          {
            from: 'src/_locales',
            to: '_locales'
          },
          {
            from: 'src/assets',
            to: 'assets'
          },
          {
            from: 'background.js'
          },
          {
            from: 'src/apps/serviceWorkerResources',
            to: 'serviceWorkerResources'
          }
        ]
      }),
    ]
  },

  filenameHashing: false,

  pages: {
    popup: {
      entry: 'src/apps/popup/index.ts',
      template: 'src/apps/popup/popup.html'
    },

    lobbyContentScripts: {
      entry: 'src/apps/content/index.js',
      chunks: [],
    },
  },
  chainWebpack: (config) => {
    config.plugin('writeFile')
      .use(WriteFilePlugin)
  },
};

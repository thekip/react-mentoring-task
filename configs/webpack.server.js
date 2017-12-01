'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const nodeExternals = require('webpack-node-externals');
const { root } = require('./path-helpers');

const mergeStrategy = webpackMerge.smartStrategy({ plugins: 'replace' });

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = mergeStrategy(commonConfig, {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'cheap-module-source-map',
  entry: [
    'server', './src/server/server-entry.tsx'
  ],
  output: {
    path: root('./src/server/built'),
    publicPath: 'built/',
    libraryTarget: 'commonjs2',
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true
            },
          },
        ],
      },
    ],
  },
  plugins: [],
});

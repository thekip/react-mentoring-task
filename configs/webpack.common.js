'use strict';

process.noDeprecation = true;

const paths = require('./path-helpers');
const env = require('./env-config');
const sassLoaders = require('./sass-loaders');

/**
 * Webpack Plugins
 */
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
  name: 'client',
  /**
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'index': './src/index.tsx',
  },

  output: {

    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: paths.root(env.destination),

    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].bundle.js',

    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    sourceMapFilename: '[file].map',

    /**
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.json'],

    /**
     * An array of directory names to be resolved to the current directory
     */
    modules: [paths.root('src'), paths.root('node_modules')],
  },

  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: sassLoaders,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
        exclude: [paths.root('src/entry.html')],
      },
      /**
       * File loader for supporting images, for example, in CSS files.
       */
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './assets/',
            publicPath: env.base,
          },
        },
      },

      /* File loader for supporting fonts in CSS files.
       */
      {
        test: /woff2?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './assets/fonts/',
            publicPath: env.base,
          },
        },
      },
    ],

  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new CheckerPlugin(),
    //new ProgressBarPlugin(),

    /**
     * Put Vendors in separate bundle
     */
    new CommonsChunkPlugin({
      name: 'vendors',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),


    /**
     * Private section Entry HTML
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};

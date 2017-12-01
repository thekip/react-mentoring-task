const paths = require('./path-helpers');

module.exports = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[name]__[local]--[hash:base64:5]',
      importLoaders: 1,
      sourceMap: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: paths.relative('postcss.config.js'),
      },
      sourceMap: true,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  }
];

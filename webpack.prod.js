const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(
  common,
  {
    mode: 'production',
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/index.prod.html',
          to: 'index.html',
          toType: 'file',
        },
        {
          from: 'now.json',
          to: 'now.json',
          toType: 'file',
        },
      ]),
    ],
  },
);

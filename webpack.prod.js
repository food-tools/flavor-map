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
          from: 'node_modules/semantic-ui-css/semantic.min.css',
          to: 'semantic.min.css',
          toType: 'file',
        },
        {
          from: 'node_modules/semantic-ui-css/themes/default/assets/fonts',
          to: 'themes/default/assets/fonts',
          toType: 'dir',
        },
        {
          from: 'src/index.prod.html',
          to: 'index.html',
          toType: 'file',
        },
        {
          from: 'CNAME',
          to: 'CNAME',
          toType: 'file',
        },
      ]),
    ],
  },
);

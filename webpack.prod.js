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
          from: 'data-v1/graph-no-null-cuisines.json',
          to: 'graph.json',
          toType: 'file',
        },
        {
          from: 'data-v1/cuisines.json',
          to: 'cuisines.json',
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

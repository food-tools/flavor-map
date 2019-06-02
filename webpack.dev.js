const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
  common,
  {
    mode: 'development',
    devtool: 'source-map',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          loader: 'source-map-loader',
        },
      ],
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      publicPath: '/dist',
      inline: true,
      historyApiFallback: {
        index: 'index.html',
      },
    },
  },
);

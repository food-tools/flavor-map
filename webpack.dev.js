const path = require('path')
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const apiMocker = require("mocker-api")

module.exports = merge(
    common,
    {
        mode: "development",
        devtool: "source-map",
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: "node_modules/semantic-ui-css/semantic.min.css",
                    to: "semantic.min.css",
                    toType: "file"
                },
                {
                    from: "node_modules/semantic-ui-css/themes/default/assets/fonts",
                    to: "themes/default/assets/fonts",
                    toType: "dir"
                }
            ])
        ],
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js|jsx)$/,
                    loader: "source-map-loader"
                }
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, "src"),
            publicPath: "/dist",
            inline: true,
            historyApiFallback: {
                index: "index.html"
            },
            before(app) {
                apiMocker(app, path.resolve('./mocker/index.js'), {
                    changeHost: true
                })
            }
        }
    }
);

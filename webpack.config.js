const path = require('path');
const apiMocker = require("mocker-api");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "index.jsx"),
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".json",
            ".html",
            ".css"
        ]
    },
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
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    plugins: [
                        "@babel/plugin-proposal-object-rest-spread",
                        "@babel/plugin-transform-regenerator",
                        "@babel/plugin-transform-runtime"
                    ],
                    presets: [
                        "@babel/env",
                        "@babel/react"
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5"
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                loader: "file-loader"
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
};

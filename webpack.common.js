const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, "src", "index.jsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".json",
            ".html",
            ".css"
        ]
    },
    module: {
        rules: [
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
    plugins: [
        new CleanWebpackPlugin()
    ]
};

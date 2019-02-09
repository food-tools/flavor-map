const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const apiMocker = require("mocker-api");

module.exports = {
    entry: path.resolve(__dirname, "src", "index.jsx"),
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".html", ".css"]
    },
    module: {
        rules: [
            { enforce: "pre", test: /\.(js|jsx$)/, loader: "source-map-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5" },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader", options: { presets: ["@babel/env", "@babel/react"], plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/plugin-transform-regenerator", "@babel/plugin-transform-runtime"] }},
            { test: /\.(png|svg|jpg|gif|ico)$/, loader: "file-loader" }
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
                changeHost: true,
            })
        }
    }
};

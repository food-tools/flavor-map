var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-react-root-plugin');
module.exports = {
    entry: "./src/index.jsx",
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: "dist"
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist/')
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            { enforce: "pre", test: /\.(js|jsx$)/, loader: "source-map-loader" },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader", query: { presets: ["@babel/env", "@babel/react"] }}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(), new ReactRootPlugin()
    ]
};

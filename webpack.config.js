var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, "src", "index.jsx"),
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"), // work computer has /src
        publicPath: path.resolve(__dirname, "dist"),
        inline: true,
        historyApiFallback: {
            index: "index.html"
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".html", ".css"]
    },
    module: {
        rules: [
            { enforce: "pre", test: /\.(js|jsx$)/, loader: "source-map-loader" },
            { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader", query: { presets: ["@babel/env", "@babel/react"], plugins: ["@babel/plugin-proposal-object-rest-spread"] }}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            templateParameters: {
                "title": "Flavor Map",
                "appContainer": "app"
            }
        })
    ]
};

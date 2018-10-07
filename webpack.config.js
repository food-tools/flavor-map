module.exports = {
    entry: "./src/index.jsx",
    mode: "development",
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        publicPath: "/",
        path: __dirname + "/dist"
    },
    devServer: {
        contentBase: './'
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};

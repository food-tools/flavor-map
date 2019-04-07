const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = merge(
    common,
    {
        mode: "production",
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
                },
                {
                    from: "src/index.prod.html",
                    to: "index.html",
                    toType: "file"
                },
                {
                    from: "data-v1/graph.json",
                    to: "graph.json",
                    toType: "file"
                },
                {
                    from: "data-v1/cuisines.json",
                    to: "cuisines.json",
                    toType: "file"
                }
            ])
        ]
    }
);

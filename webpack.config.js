const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "SodokuJS",
            filename: "index.html"
        }),
        new CopyPlugin([{
            from: "src/assets",
            to: "assets"
        }])
    ],
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "src")
        }
    },
    devServer: {
        port: 3000,
        compress: true
    },
    mode: "development"
};
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "SodokuJS",
            filename: "index.html"
        })
    ],
    devServer: {
        port: 3000,
        compress: true
    },
    mode: "development"
}
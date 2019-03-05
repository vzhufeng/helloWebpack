const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { htmlEntry, resolve } = require("./utils");

const htmlWebpackPluginArr = [];
for (let i = 0, len = htmlEntry.length; i < len; i++) {
  const ele = htmlEntry[i];
  htmlWebpackPluginArr.push(
    new HtmlWebpackPlugin({
      template: ele.path,
      filename: `${ele.name}.html`,
      chunks: [ele.name, "vendor"]
    })
  );
}

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: "[name]_[contenthash].css"
});

const webpackManifestPlugin = new WebpackManifestPlugin({
  filename: "manifest.json"
});

const cleanWebpackPlugin = new CleanWebpackPlugin(["dist"], {
  root: resolve([]),
});

module.exports = [
  ...htmlWebpackPluginArr,
  miniCssExtractPlugin,
  webpackManifestPlugin,
  cleanWebpackPlugin
];

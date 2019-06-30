const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");

const { htmlEntry, resolve, config } = require("./utils");

const htmlWebpackPluginArr = [];
for (let i = 0, len = htmlEntry.length; i < len; i++) {
  const ele = htmlEntry[i];
  htmlWebpackPluginArr.push(
    new HtmlWebpackPlugin({
      template: ele.path,
      filename: `${ele.name}.html`,
      chunks: [ele.name, "vendor"],
      chunksSortMode: 'dependency'
    })
  );
}

module.exports = [
  ...htmlWebpackPluginArr,
  new webpack.ProgressPlugin(), //显示进度
  new WebpackManifestPlugin({ filename: "manifest.json" }),
  new ModuleConcatenationPlugin(), //scope hoist
];

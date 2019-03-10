const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const { htmlEntry, resolve } = require("./utils");

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
  new MiniCssExtractPlugin({ filename: "[name]_[contenthash].css" }),
  new CleanWebpackPlugin(["dist"], { root: resolve([]) }),
  new WebpackManifestPlugin({ filename: "manifest.json" }),
  new VueLoaderPlugin()
];

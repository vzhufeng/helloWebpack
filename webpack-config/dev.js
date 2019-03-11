const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const base = require("./base");
const rules = require("./rules");
const plugins = require("./plugins");
const { resolve } = require("./utils");

module.exports = merge(base, {
  output: {
    path: resolve(["dist"]), 
    filename: "[name].js", // 避免每次watch打包出来不同的文件名
    sourceMapFilename: "[name].map"
  },
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map",
  // 模块，loader
  module: {
    rules
  },
  // 插件
  plugins: plugins.concat(new MiniCssExtractPlugin({ filename: "[name].css" }))
});

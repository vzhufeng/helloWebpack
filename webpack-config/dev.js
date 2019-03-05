const merge = require("webpack-merge");

const base = require("./base");
const rules = require("./rules");
const plugins = require("./plugins");

module.exports = merge(base, {
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map",
  // 模块，loader
  module: {
    rules
  },
  // 插件
  plugins
});

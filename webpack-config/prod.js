const merge = require("webpack-merge");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const base = require("./base");
const rules = require("./rules");
const plugins = require("./plugins");

module.exports = merge(base, {
  // 模式
  mode: "production",
  // 模块，loader
  module: {
    rules
  },
  // 插件
  plugins: plugins.concat(
    new OptimizeCssAssetsWebpackPlugin()
  ),
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: 'vendor'
        }
      }
    }
  },
  performance: {
    hints: "warning", // 打包出来的文件大小警告
    maxEntrypointSize: 1000000, // 入口文件大小
    assetFilter: assetFilename =>
      assetFilename.endsWith(".css") || assetFilename.endsWith(".js") // 过滤资源文件类型
  }
});

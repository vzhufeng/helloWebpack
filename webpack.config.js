const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: "index.html",
  template: path.resolve(__dirname, "./src/index.html")
});

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          // creates style nodes from JS strings
          "style-loader",
          // translates CSS into CommonJS
          "css-loader",
          // compiles Sass to CSS
          "sass-loader"
        ]
      }
    ]
  },
  // 配置开发服务器
  devServer: {
    // dist为基本目录
    contentBase: path.join(__dirname, "dist"),
    // 压缩代码
    compress: true,
    // 服务端口
    port: 3011,
    // 自动打开浏览器
    open: true
  },
  plugins: [htmlWebpackPlugin]
};

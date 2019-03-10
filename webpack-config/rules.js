const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { resolve } = require("./utils");
const path = require("path");

module.exports = [
  {
    test: /\.(js|jsx)$/,
    use: [{ loader: "babel-loader", options: { cacheDirectory: true } }],
    include: resolve(["src"])
  },
  {
    test: /\.vue$/,
    use: ["vue-loader"],
    include: resolve(["src"])
  },
  {
    test: /\.(sass|scss|css)$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    include: resolve(["src"])
  },
  {
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
    include: resolve(["src"])
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      {
        loader: "file-loader",
        options: { name: path.join("static", "[name].[ext]") }
      }
    ],
    include: resolve(["src", "assets"])
  },
  {
    test: /\.(png|svg|jpeg|jpg|gif)$/,
    use: [
      {
        loader: "file-loader",
        options: { name: path.join("static", "[name].[ext]") }
      }
    ],
    include: resolve(["src", "assets"])
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
    use: [
      {
        loader: "file-loader",
        options: { name: path.join("static", "[name].[ext]") }
      }
    ],
    include: resolve(["src", "assets"])
  }
];

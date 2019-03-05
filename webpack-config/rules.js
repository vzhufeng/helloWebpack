const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { resolve } = require("./utils");

module.exports = [
  {
    test: /\.(js|jsx)$/,
    use: ["babel-loader"],
    include: resolve(["src"])
  },
  // {
  //   test: /\.vue$/,
  //   use: ["vue-loader"],
  //   include: resolve(['src'])
  // },
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
    use: ["file-loader"],
    include: resolve(["assets"])
  },
  {
    test: /\.(png|svg|jpeg|jpg|gif)$/,
    use: ["file-loader"],
    include: resolve(["assets"])
  }
];

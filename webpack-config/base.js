const { jsEntry, resolve } = require("./utils");

module.exports = {
  entry: jsEntry,
  output: {
    path: resolve(["dist"]),
    filename: "[name]_[contenthash].js",
    sourceMapFilename: "[name].map"
  },
  resolve: {
    alias: {
      Utils: resolve(["src", "utils"]),
      Components: resolve(["src", "components"]),
      Assets: resolve(["src", "assets"]),
    },
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"] // import时可以不用写这些后缀名
  }
};

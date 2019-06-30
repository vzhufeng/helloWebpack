const { jsEntry, resolve, config } = require("./utils");

module.exports = {
  entry: jsEntry,
  output: {
    path: config.prod.output,
    filename: "[name]_[contenthash].js"
  },
  resolve: {
    alias: {
      Utils: resolve(["src", "utils"]),
      Components: resolve(["src", "components"]),
      Assets: resolve(["src", "assets"])
    },
    // import时可以不用写这些后缀名
    extensions: [".vue", ".js", ".jsx"], 
    mainFields: ["jsnext:main", "browser", "main"]
  }
};

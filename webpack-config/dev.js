const merge = require("webpack-merge");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const base = require("./base");
const rules = require("./rules");
const plugins = require("./plugins");
const { resolve, config } = require("./utils");

// 启动静态资源服务
const express = require("express");
const app = express();
// 本地监听的端口
const port = config.public.port;
// 本地监听的目录
app.use(express.static(resolve([])));
app.listen(port);

const wpConfig = merge(base, {
  output: {
    path: config.dev.output,
    filename: "[name].js", // 避免每次watch打包出来不同的文件名
    sourceMapFilename: "[name].map"
  },
  // 模式
  mode: "development",
  devtool: "source-map", // 这个选项输出的比较慢，但是便于开发调试，想快一点可以用cheap-module-source-map
  // 模块，loader
  module: {
    rules: [
      ...rules,
      {
        test: /\.(sass|scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      process.argv[2] === 'vue' ? {
        test: /\.vue$/,
        use: ["vue-loader"],
        include: resolve(["src"])
      } : {}
    ]
  },
  // 插件
  plugins: [
    ...plugins,
    new CleanWebpackPlugin([config.dev.output], { root: resolve([]) }),
    process.argv[2] === 'vue' ? new VueLoaderPlugin() : ()=>{}
  ]
});

const compiler = webpack(wpConfig);
compiler.watch(
  {
    aggregateTimeout: 300,
    poll: undefined
  },
  (err, stats) => {
    if (err) throw err;

    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      })}\n\n`
    );

    if (stats.hasErrors()) {
      // 打印出webapck的详细报错
      // console.log(stats.toJson());
      process.exit(1);
    }

    // 编译完成后执行的操作，dev可能不太有
  }
);

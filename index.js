#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const merge = require('webpack-merge');

const { confirm, list, withProm } = require("./util");

const dir = process.cwd();
const getTargetName = p => path.resolve(dir, ...p);
const getDirName = p => path.resolve(__dirname, ...p);
let projKind = "react";

// 入口
list({
  message: "需要搭建一个react工程还是vue工程",
  name: "kind",
  choices: ["react", "vue"],
  cb: answers => {
    projKind = answers.kind;
    readPkg();
  }
});

function readPkg() {
  // 把dev依赖写入
  function mergePkg(pkgObj) {
    if (toString.call(pkgObj) === '[object Object]') {
      const config = require(getDirName([projKind, "pkg.js"]));
      const pkgStr = JSON.stringify(
        merge(pkgObj, {
          devDependencies: config.dev,
          dependencies: config.dep,
          scripts: {
            dev: "webpack --config ./webpack-config/dev.js --progress --watch",
            build: "webpack --config ./webpack-config/prod.js --progress"
          }
        }),
        null,
        "  "
      );
      fs.writeFile(getTargetName(["package.json"]), pkgStr, err => {
        if (err) {
          // pkg出错，不进行后面的创建文件操作
          console.log("当前操作：写配置到package.json文件", err);
        } else {
          createFiles();
        }
      });
    } else {
      console.log("package.json文件解析出错，请重新生成");
    }
  }

  fs.readFile(getTargetName(["package.json"]), (err, buf) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("package.json文件不存在，请先执行npm init");
      } else {
        console.log("当前操作：读取package.json文件", err);
      }
    } else {
      let pkgObj = "";
      try {
        pkgObj = JSON.parse(buf.toString());
      } catch (e) {}

      if (pkgObj.dependencies || pkgObj.devDependencies || pkgObj.scripts) {
        confirm({
          message:
            "package.json文件中已有dependencies或devDependencies或scripts字段，helloWebpack会对相同的字段进行覆盖，是否继续",
          name: "cover",
          cb: answers => {
            if (answers.cover) {
              mergePkg(pkgObj);
            } else {
              createFiles();
            }
          }
        });
      } else {
        mergePkg(pkgObj);
      }
    }
  });
}

async function createFiles() {
  try {
    await withProm(makeDir, ["webpack-config"]);

    await withProm(createFile, { opPath: ["webpack-config", "base.js"] });
    await withProm(createFile, { opPath: ["webpack-config", "dev.js"] });
    await withProm(createFile, { opPath: ["webpack-config", "plugins.js"] });
    await withProm(createFile, { opPath: ["webpack-config", "prod.js"] });
    await withProm(createFile, { opPath: ["webpack-config", "rules.js"] });
    await withProm(createFile, { opPath: ["webpack-config", "utils.js"] });

    await withProm(makeDir, ["src"]);
    await withProm(makeDir, ["src", "example"]);

    await withProm(createFile, {
      opPath: [projKind, "entry.html"],
      dstPath: ["src", "example", "index.html"]
    });
    await withProm(createFile, {
      opPath: [projKind, "entry.js"],
      dstPath: ["src", "example", "index.js"]
    });
    await withProm(projKind === 'vue' ? createFile : ()=>{}, {
      opPath: [projKind, "entry.vue"],
      dstPath: ["src", "example", "entry.vue"]
    });

    await withProm(createFile, { opPath: [projKind, "babelrc"], dstPath: [".babelrc"] });
    // await withProm(createFile, {
    //   opPath: "eslintrc",
    //   dstPath: ".eslintrc.json"
    // });

    console.log("helloWebpack已完成工程的搭建，执行npm install安装相关依赖");
    console.log("安装依赖后，运行npm run dev启动工程");

  } catch (e) {
    console.log(e);
  }
}

// 创建文件
function createFile(res, rej, { opPath, dstPath }) {
  const dst = dstPath || opPath;

  function wf() {
    fs.copyFile(
      getDirName(opPath), // src
      getTargetName(dst), // dst
      err => {
        if (err) {
          console.log(err);
          rej();
        }
        res();
      }
    );
  }

  fs.stat(getTargetName(dst), err => {
    if (err) {
      if (err.code === "ENOENT") {
        // 文件不存在，直接拷贝
        wf();
      } else {
        console.log(`当前操作：创建文件${dst}`, err);
        rej();
      }
    } else {
      confirm({
        message: `文件${dst.join("/")}已存在，helloWebpack会进行覆盖，是否继续`,
        name: "cover",
        cb: answers => {
          if (answers.cover) {
            wf();
          } else {
            res();
          }
        }
      });
    }
  });
}

// 创建目录
function makeDir(res, rej, opPath) {
  fs.mkdir(getTargetName(opPath), err => {
    if (err) {
      // 目录已经存在
      if (err.code === "EEXIST") {
        res();
      } else {
        console.log(err);
        rej();
      }
    }
    res();
  });
}

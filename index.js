#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const _merge = require("lodash/merge");
const _isObject = require("lodash/isObject");
const { confirm, withProm } = require("./util");
const pkgConfig = require("./pkgConfig");

const dir = process.cwd();
const getTargetName = p => path.resolve(dir, p);
const getDirName = p => path.resolve(__dirname, p);

// 入口
readPkg();

function readPkg() {
  // 把dev依赖写入
  function mergePkg(pkgObj) {
    if (_isObject(pkgObj)) {
      const pkgStr = JSON.stringify(
        _merge(pkgObj, {
          devDependencies: pkgConfig.dev,
          scripts: { dev: "webpack-dev-server" }
        }),
        null,
        "  "
      );
      fs.writeFile(getTargetName('package.json'), pkgStr, err => {
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

  fs.readFile(getTargetName('package.json'), (err, buf) => {
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

      if (pkgObj.devDependencies || pkgObj.scripts) {
        confirm({
          message:
            "package.json文件中已有devDependencies或scripts字段，helloWebpack会对相同的字段进行覆盖，是否继续",
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
    await withProm(createFile, { opPath: 'webpack.config.js' });

    await withProm(makeDir, "src");

    await withProm(createFile, {
      opPath: "entry.html",
      dstPath: "src/index.html"
    });
    await withProm(createFile, {
      opPath: "entry.js",
      dstPath: "src/index.js"
    });

    await withProm(createFile, { opPath: "babelrc", dstPath: ".babelrc" });
    // await withProm(createFile, {
    //   opPath: "eslintrc",
    //   dstPath: ".eslintrc.json"
    // });
    console.log('helloWebpack已完成工程的搭建，执行npm install安装相关依赖');
    console.log('安装依赖后，运行npm run dev启动工程');
  } catch (e) {
    console.log(e);
  }
}

// 创建文件
function createFile(res, rej, { opPath, dstPath }) {
  function wf() {
    fs.copyFile(
      getDirName(opPath), // src
      getTargetName(dstPath || opPath), // dst
      err => {
        if (err) {
          console.log(err);
          rej();
        }
        res();
      }
    );
  }

  fs.stat(getTargetName(dstPath || opPath), err => {
    if (err) {
      if (err.code === "ENOENT") {
        // 文件不存在，直接拷贝
        wf();
      } else {
        console.log(`当前操作：创建文件${dstPath || opPath}`, err);
        rej();
      }
    } else {
      confirm({
        message: `文件${dstPath || opPath}已存在，helloWebpack会进行覆盖，是否继续`,
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
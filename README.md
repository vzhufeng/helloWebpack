# helloWebpack

用于搭建前端react / vue的业务工程（注意是业务工程，写工具库要做修改）

## 特性
node >= 8

✅react、vue

✅sass、less

❎postcss

❎ts

## 安装
```
npm install @vzhufeng/hello-webpack -g
```

## 使用
1. npm init，主要就是写个工程名字而已
2. hw，向package.json写入react / vue工程相关依赖，这一步里遇到已经有相同文件或者相同字段都会询问是否需要进行覆盖
3. npm install，安装依赖
4. npm run dll，打包dll
5. npm run dev，启动工程

更多配置和使用查看usage.md，https://github.com/vzhufeng/helloWebpack/blob/master/usage.md

使用方法变更查看changelog.md，https://github.com/vzhufeng/helloWebpack/blob/master/changelog.md

## todo
- 只打包某个目录

## 修改文件
- package.json
- webpack-config文件夹
- src/example文件夹
- .babelrc






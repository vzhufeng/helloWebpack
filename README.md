# helloWebpack

用于搭建前端react工程（其实稍微改改就可以搭别的工程用）

感谢这位作者，我的demo工程是按照这篇文章搭的，https://www.jianshu.com/p/0bd84b8656c5

## 使用
1. npm init，主要就是写个工程名字而已
2. hw，向package.json写入前端react工程相关依赖；创建webpack.config.js；创建src目录，在src下创建index.html和index.js；创建.babelrc。这一步里遇到已经有相同文件或者相同字段都会询问是否需要进行覆盖
3. npm install，安装依赖
4. npm run dev，启动工程

## todo
- 服务端口号配置
- 处理打包的各种选项和相关支持

## 修改文件
- package.json
- webpack.config.js
- src/index.html、src/index.js
- .babelrc
- .eslintrc.json（暂无）

## 收获
1. JSON.stringify和JSON.parse加深了了解
2. node编写命令行程序加深了了解
3. 发布了第一个npm包






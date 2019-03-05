## 1.0.0
支持多页面，不支持热更新

开发模式，输出本地文件（输出到dist）：npm run dev
生产编译（输出到dist）：npm run build

项目结构如下，不按照这个结构需要修改代码：
```
proj
  |-src
    |-page1
      |-index.html
      |-index.js
      |-other.js
      |-index.scss
    |-page2
      |-index.html
      |-index.js
      |-other.js
      |-page.scss
  |-assets
    |-icon.png    
```
其中，index.html和index.js是必需文件，index.js是打包入口，index.html是模板文件，样式文件的文件名可以随意；assets目录下可以放图标、图片等静态资源

打包后生成在dist目录下，所有页面的模板文件以所在的文件夹命名，如上图的项目结构打包后生成的dist目录如下：
```
dist
  |-page1.html
  |-page1_xxxxxx.js
  |-page1_xxxxxx.css
```
其中xxxxxx表示文件内容的hash，



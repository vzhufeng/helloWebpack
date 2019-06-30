## 1.0.0
✅多页面

❎热更新

❎单独打包某个目录

配置文件会全部导出到工程目录下的webpack-config文件夹中，方便每个工程的特殊需求修改

开发模式，输出本地文件（输出到local）：npm run dev

生产编译（输出到dist）：npm run build

项目结构如下，**不按照这个结构需要修改代码**：
```
// for react
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
  |-components // 公共组件目录
  |-utils //   公共函数目录    
  |-assets
    |-icon.png //最好上传cdn，能不用本地资源就不用

// for vue    
proj
  |-src
    |-page1
      |-index.html
      |-index.js
      |-page.vue
    |-page2
      |-index.html
      |-index.js
      |-other.vue
  |-components // 公共组件目录
  |-utils //   公共函数目录
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
  |-static
    |-icon.png
```
其中xxxxxx表示文件内容的hash（dev模式下没有hash），静态资源（图片、字体等）会放在dist/static目录下



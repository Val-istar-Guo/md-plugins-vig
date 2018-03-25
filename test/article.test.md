# Vue-Koa 同构开发环境

虽然 Vue 已经提供了近乎完美的工程化工具 vue-cli，但是对于一些人来说，自行搭建一个灵活的开发环境也是一个不错的选择。这篇文章将介绍我是如何使用Vue、Koa、PM2等常用框架搭建一个更适合我个人开发的工程环境。

读这篇文章前，你必须要了解的内容有: Vue, Koa, Webpack, Babel

可以下载[Github仓库](https://github.com/Val-istar-Guo/vue-boilerplate)以供阅读文章参考或提出修改建议。



## 功能需求

- 开发环境的 Hot Reload （热重载）是必不可少的
- 支持 Server Side Render （服务器渲染）
- 兼容非同构 nodeJS 模块的使用
- 通过 PM2 快速部署项目



## Hot Reload

Webpack 提供 Hot Reload 支持，Vue本身也支持 Hot Reload。因此，仅需在 webpack 配置文件中进行如下配置：

```javascript
{
  // More Config...
  bundle: [
    'Your Entry File',
    'webpack-hot-middleware/client',
  ],
  // More Config...
}
```



## Server Side Render

### 实现

Vue 具有极好的生态环境，我们可以直接使用`vue-server-renderer`。这里我们使用的是`vue-server-renderer` 提供的 `createBundleRenderer()` 方法通过`vue-ssr-bundle.json`文件进行渲染。

`vue-ssr-bundle.json` 文件是通过`vue-ssr-webpack-plugin`生成的 Client 端代码（具体编译成的内容意义我也不清楚）。这样我们就不需要在 Server 端引入 Client 端代码，再去渲染。仅仅需要将 `vue-ssr-webpack-plugin` 生成的`vue-ssr-bundle.json`文件内容作为参数传入 `createBundleRenderer()` 方法，就可以得到 Client 端 HTML 的渲染结果。

更具体的说明请移步[Vue Server Side Render文档](https://ssr.vuejs.org/zh/)。文档中对通过Vue实现服务端渲染有详细对说明。本项目参照其基本结构搭建客户端部分代码，如果你初次接触这部分，可能对`entry-ssr.js`、`entry-client.js`、`createRouter.js`等文件的结构和写法疑惑不解，甚至怀疑这些文件存在的必要性，不过在[Vue Server Side Render文档](https://ssr.vuejs.org/zh/)中都对其进行了详细解释。



## 兼容非同构模块使用

虽然 `vue-server-renderer` 虽然使用方法非常便捷而神奇，但是依旧不能自动的支持非同构的 JS 代码在Server端运行。例如，如果你使用`Chart.js^2.5.0`（一个小巧的图标绘制插件），将会报错`Cannot Find xxx from undefined`。这里是由于未定义的变量`window`导致的。我们都知道，`window`是浏览器中的变量而NodeJS环境中并不存在。在服务端运行这样的代码是不可能的，但放着如此不错的插件不用，未免太可惜了。

我们可以通过一个折衷的方法，通过在生成ssr所使用的webpack配置文件中设定别名，将模块指向一个代替模块。默认代替模块为`empty.js`，webpack 配置如下：

```javascript
// empty.js
export default null;
```

```javascript
// webpack.config.ssr.js
{
  // More Config...
  resolve: {
    // More Config...
    alias: {
      chart: path.resolve(__dirname, 'empty'),
    },
  },
  // More Config...
}
```

```javascript
// webpack.config.client.js & webpack.config.client.dev.js
{
  // More Config...
  resolve: {
    // More Config...
    alias: {
      chart: 'chart.js',
    },
  },
  // More Config...
}
```

这里必须注意，别名不能与node中安装的模块重名。因此这里使用`chart`作为别名而不是`chart.js`。在使用的时候要注意，在服务端渲染时chart.js会被empty.js代替。

```javascript
import Chart from 'chart';

if (Chart !== null) {
  // running on client;
} else {
  // running on server side render;
}
```

虽然这样处理并不优雅，至少能解决燃眉之急。最佳的方案还是选择一些同构的模块，这仅仅作为一个应急方案。


由于webpack有许多需要根据项目灵活控制的部分。为了方便管理，我们将这部分统一放置在`webpack.config.expand.js`文件中。server/client/ssr等部分的webpack配置均从此文件中导入响应配置。

```javascript
import path from 'path';


// 扩展配置
export default {
  ssrFileName: 'vue-ssr-bundle.json',
  manifestFileName: 'vue-ssr-manifest.json',
  /**
   * 非同构模块, 不可用于ssr在server端运行
   * 会被默认替代为empty.js
   * 需要在代码中进行兼容处理
   */
  nonIsomorphicModule: {
    // chart: 'chart.js',
  },

  // 非JS模块，不可用于ssr, ssr代码需要在nodejs中运行
  nonJsModule: [
    'normalize.css',
  ],

  // 外部依赖库，打包成独立js包
  lib: [
    'vue',
    'vuex',
    'vue-router',
    'detect-env',
    'superagent',
  ],

  alias: {
    framework: path.resolve(__dirname, '../framework'),
  },
}
```



## 快速部署

PM2提供来快速部署的方法，如果你想详细了解如何使用，最好学习PM2然后了解 ecosystem.config.js 中的PM2配置。



## 开发体验

### Node Server Reload

这里并没有使用nodemon来做node server重启，而是直接使用PM2来做，目的是减少一些不必要的包依赖。配合 Hot Reload 可以达到一流的开发体验。

### 格式约束

使用`.editorconfig`编辑器基本格式。对于代码风格，本来作者打算使用 eslint + airbnb进行，但是vue文件又不太适合。在 Server 端也存在大量的JS文件，真希望有个完美的eslint插件。

### 默认别名

在这个模版中，`framework`分别用于存放在 Server 端和 Client 端都会使用的公共静态变量和工具模块。为了方便使用，在两端都设置了别名(framework)。

由于引入了webpack的别名机制，server端代码必须经过webpack编译后运行。在这里，`build/server.dev.js`帮我们进行了server端代码端编译和运行。因此`webpack.config.expand.js`中配置对别名对于server端也是生效的。



## Problems

### PM2 无法与 Git 1.8 协同工作

和我一样使用CentOS的也大有人在，但是CentOS默认Yum仓库的git版本还停留在古老的 1.8 版。当你的服务器git版本为 1.8.x时，使用PM2部署到该服务器，将无法获取仓库中提交的最新版本，我并不知道这是为什么，最简单的解决方案就是更新CentOS的git到最新版。

### yarn or npm 安装依赖时被随机kill

使用PM2部署时会首先安装需要的依赖，在使用`yarn`或`npm i`时，可能会提示被kill掉，导致部署失败。这很可能时由于你租用的服务器内存太小的缘故（本项目的依赖稍多）。作者使用的是 1核1G的 的CentOS，通过添加一个 1G 的swap 可以解决这个问题。

### nonJsModule 配置问题

在 webpack.config.expand.js 中存在一个字段为`nonJsModule`。它含义是在server端无法直接运行，但是在client端需要的文件，最明显的例子就是css文件。由于服务端渲染端缘故，client端代码将专名打包并在服务端运行。默认情况下，为了使ssr部分端client端打包文件尽可能小，会自动的移除package.json中指明的依赖。

我们不难想到，之所以可以在client端直接import css文件是因为有webpack端loader做处理。<span style="color: red">如果ssr部分移除了package.json指明的依赖</span>，这些依赖也将不会被loader处理，而原生的nodejs并不能直接解析／读取CSS文件。因此，如果在package.json指明的依赖不是可以在**node环境**中直接运行的文件，则这些文件需要被_webpack处理_并一起打包到ssr端的运行文件中去。

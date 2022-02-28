# JCAdmin ： 一款简易上手的轻型后台框架



版本号：0.0.3



## 1. 安装

npm

```shell
```



### `esModule`

Type: `Boolean` Default: `true`

By default, `raw-loader` generates JS modules that use the ES modules syntax. There are some cases in which using ES modules is beneficial, like in the case of [module concatenation](https://webpack.js.org/plugins/module-concatenation-plugin/) and [tree shaking](https://webpack.js.org/guides/tree-shaking/).

您可以使用以下命令启用CommonJS模块语法:

**webpack.config.js**

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
```

const lernaJson = require("./lerna.json")

module.exports = plop => {
  plop.setGenerator('component', {
    description: "创建 component",
    // 交互提示
    prompts: [
      {
        type: 'input', // 方式
        name: 'name', // 对应字段
        message: 'package name',
        default: 'test'
      },
      {
        type: 'input', // 方式
        name: 'version', // 对应字段
        message: 'package version',
        default: lernaJson.version
      }
      // ...
    ],
    actions: [
      {
        type: 'add', // 添加文件
        path: 'packages/{{name}}/package.json',
        templateFile: 'plop-template/package.hbs' // 模版文件 使用 Handlebars 语法
                                                    // 通常在项目的根目录
      },
      {
        type: 'add', // 添加文件
        path: 'packages/{{name}}/src/index.js',
        templateFile: '' // 模版文件 使用 Handlebars 语法
      },
      {
        type: 'add', // 添加文件
        path: 'packages/{{name}}/rollup_config.js',
        templateFile: 'plop-template/rollup_config.hbs' // 模版文件 使用 Handlebars 语法
      },
      // ... 多文件模版
    ]
  })
}
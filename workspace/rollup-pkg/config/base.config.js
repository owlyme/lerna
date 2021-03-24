// Rollup plugins
// babel插件用于处理es6代码的转换，使转换出来的代码可以用于不支持es6的环境使用
const babel = require('rollup-plugin-babel');
// resolve将我们编写的源码与依赖的第三方库进行合并
const resolve = require('rollup-plugin-node-resolve');
// 解决rollup.js无法识别CommonJS模块
const commonjs = require('rollup-plugin-commonjs');
// 全局替换变量比如process.env
const replace = require('rollup-plugin-replace');
// 使rollup可以使用postCss处理样式文件less、css等
const postcss = require('rollup-plugin-postcss');
// 可以处理组件中import图片的方式，将图片转换成base64格式，但会增加打包体积，适用于小图标
const image = require('@rollup/plugin-image');
// 压缩打包代码（这里弃用因为该插件不能识别es的语法，所以采用terser替代）
// const = { uglify require( from 'rollup-plugin-uglify');
// 压缩打包代码
const  terser = require('rollup-plugin-terser').terser;
// PostCSS plugins
// 处理css定义的变量
const simplevars = require('postcss-simple-vars');
// 处理less嵌套样式写法
const nested = require('postcss-nested');
// 替代cssnext
const postcssPresetEnv = require('postcss-preset-env');
// css代码压缩
const cssnano = require('cssnano');
const clear = require('rollup-plugin-clear');


const { NODE_ENV, BABEL_ENV } = process.env
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs'
const loose = true

const env = process.env.NODE_ENV;

module.exports = function ({
  outPutBasePath
}) {

  return {
    onwarn: function (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
    },
    plugins: [
      image(),
      postcss({
        plugins: [
          simplevars(),
          nested(),
          // cssnext({ warnForDuplicates: false, }),
          postcssPresetEnv(),
          cssnano(),
        ],
        // 处理.css和.less文件
        extensions: [ '.css', '.less' ],
      }),
      resolve(),
      // babel处理不包含node_modules文件的所有js
      babel({
        exclude: '**/node_modules/**',
        runtimeHelpers: true,
        plugins: [
          "@babel/plugin-external-helpers"
        ],
        presets: [['@babel/env', { loose, modules: false }]],
        plugins: [
          ['@babel/proposal-decorators', { legacy: true }],
          ['@babel/proposal-object-rest-spread', { loose }],
          // 对jsx语法进行转换
          '@babel/transform-react-jsx',
          cjs && ['@babel/transform-modules-commonjs', { loose }],
          [
            '@babel/transform-runtime',
            {
              useESModules: !cjs,
              version: require('../package.json').dependencies[
                '@babel/runtime'
              ]
            }
          ],
          ["@babel/plugin-proposal-class-properties"]
        ].filter(Boolean)
      }),
      // 这里有些引入使用某个库的api但报未导出改api通过namedExports来手动导出
      commonjs({
        'namedExports': {
          'node_modules/react-is/index.js': ['isFragment'],
          'node_modules/react/index.js': ['Fragment', 'cloneElement', 'isValidElement', 'Children', 'createContext', 'Component', 'useRef', 'useImperativeHandle', 'forwardRef', 'useState', 'useEffect', 'useMemo'],
          'node_modules/react-dom/index.js': ['render', 'unmountComponentAtNode', 'findDOMNode'],
          'node_modules/gojs/release/go.js': ['Diagram', 'GraphLinksModel', 'Overview', 'Spot']
        }
      }),
      // 全局替换NODE_ENV，exclude表示不包含某些文件夹下的文件
      replace({
        // exclude: 'node_modules/**',
        'process.env.NODE_ENV':  JSON.stringify(env || 'development'),
      }),
      // 生产环境执行terser压缩代码
      (env === 'production' && terser()),
      // clear({
      //   // required, point out which directories should be clear.
      //   targets: [outPutBasePath],
      //   // optional, whether clear the directores when rollup recompile on --watch mode.
      //   watch: true, // default: false
      // })
    ],
  }
}
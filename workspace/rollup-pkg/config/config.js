const baseConfig = require("./base.config")

const { NODE_ENV, BABEL_ENV } = process.env
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs'
const loose = true
const env = process.env.NODE_ENV;

function inputOptions ({
  input,
  external = ['react'],
  outPutBasePath
}) {
  return {
    input,
    external,
    ...baseConfig({
      outPutBasePath
    })
  }
}

function outputOptions ({
  fileName,
  compnentName,
  outPutBasePath = "dist"
}) {
  return {
      file: `${outPutBasePath}/${fileName}.umd.js`,
      format: 'umd',
      name: compnentName,
      extend: true
    }
} 

module.exports = {
  inputOptions,
  outputOptions
}
#!/usr/bin/env node

const path = require('path')
const roullBundle = require("../lib/index")
const basePath = process.cwd();
function resolve(file) {
    return path.resolve(basePath, file)
}

const config = require(resolve(process.argv[2] || "./_component/config.js"));


roullBundle(config)


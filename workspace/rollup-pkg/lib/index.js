
const path = require('path')
const rollup = require('rollup');

const {
    inputOptions,
    outputOptions
} = require("../config/config.js")

const basePath = process.cwd();

function resolve(file) {
    return path.resolve(basePath, file)
}

async function build({
    input,
    fileName,
    external,
    compnentName = "WeiMob",
    outPutBasePath
}) {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions({
        input,
        outPutBasePath,
        external
    }));

    // or write the bundle to disk
    await bundle.write(outputOptions({
        fileName,
        compnentName,
        outPutBasePath
    }));

    // closes the bundle
    await bundle.close();
};


module.exports = function (config) {
    const configList = Array.isArray(config) ? config : [config];

    configList.forEach(({
        input,
        fileName,
        compnentName,
        outPutBasePath,
        external,
        ...others
    }) => {
        try {
            build({
                ...others,
                input: resolve(input),
                fileName,
                compnentName,
                outPutBasePath: resolve(outPutBasePath),
                external: external || ['react']
            });
        } catch(e) {
            console.error(e)
        }
    });
}

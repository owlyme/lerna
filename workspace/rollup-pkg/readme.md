## configfile.js
```
module.exports = [
    {
        input: 'src/components/rollup/A1.js',
        fileName: "A1",
        compnentName: "WeiMob.A1",
        outPutBasePath: "./public",
        external: ['react', 'loadsh', './B1'],
    },
    {
        input: 'src/components/rollup/A2.js',
        fileName: "A2",
        compnentName: "WeiMob.A2",
        outPutBasePath: "./public",
        external: ['react', 'loadsh', './B1'],
    },
    ...
]
```
const path = require("path")
const fs = require("fs")
const Router = require('@koa/router');
const router = new Router();

const publicPath = "../../public/reactComps/";

router.get('/compose/js', async (ctx, next) => {
    const composeJs = (ctx.query.js || '').split(";")
    
    const readMulitFiles = (pathArr, wirteStream) => {
        const RS = fs.createReadStream(path.resolve(__dirname, publicPath, pathArr.shift()));
        const leftPath = pathArr.length
        RS.pipe(wirteStream, {end: !leftPath})
        RS.on("end", () => {
            
            if (leftPath) {
                readMulitFiles(pathArr, wirteStream)
            } else {
                console.log("end")
                wirteStream.end()
            }
            RS.close()
        })
    }

    ctx.body = function(res) {
        readMulitFiles(composeJs, res)
    }
});



module.exports = function (app) {
    app.use(router.routes()).use(router.allowedMethods());
}


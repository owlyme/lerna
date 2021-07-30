const Router = require('@koa/router');
const DB = require("../../db")
const router = new Router();

DB.createTable("components")
DB.createTable("componentsConfig")

router.get('/complist', async (ctx, next) => {
    ctx.body =  DB.getList('components')
});

router.post('/save/config', async (ctx, next) => {
    const id = DB.addData('componentsConfig', {
        config: ctx.reqParam
    })
    ctx.body = id
});

router.get('/get/config', async (ctx, next) => {
    // "/compose/js?js=/reactComps/A1.umd.js;/reactComps/A2.umd.js"

    const config = DB.getDetail('componentsConfig', ctx.reqParam.id).config || []
    ctx.body = config
});

router.post('/upload', async (ctx, next) => {
    const {name, path}  = ctx.request.files.file
    const id = DB.addData('components', {
        name,
        path: path.split("public")[1].replace(/\\/g,"/")
    })

    ctx.body = id
});

module.exports = function (app) {
    app.use(router.routes()).use(router.allowedMethods());
}

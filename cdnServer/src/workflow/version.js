const Router = require('@koa/router');
const { createResBody } = require("./utils")
const DB = require("../../db")

const router = new Router();
DB.createTable("version")

router.post('/wk/version/detail', async (ctx, next) => {
    const appId = ctx.reqParam.id
    const data = DB.getDetail('version', appId)
    ctx.body = createResBody({
        data
    })
});

router.post('/wk/version/create', async (ctx, next) => {
    const id = DB.addData('version', ctx.reqParam)
    ctx.body = createResBody({
        id
    })
});

router.post('/wk/version/remove', async (ctx, next) => {
    const id = DB.remove('version', ctx.reqParam.id)
    ctx.body = createResBody({
        id
    })
});

router.post('/wk/version/update', async (ctx, next) => {
    const id = DB.update('app', ctx.reqParam)
    ctx.body = createResBody({
        id
    })
});

module.exports = router
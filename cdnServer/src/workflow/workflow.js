const Router = require('@koa/router');
const { createResBody } = require("./utils")
const DB = require("../../db")

const router = new Router();
DB.createTable("workflow")
DB.createTable("version")

router.post('/wk/workflow/list', async (ctx, next) => {
    const appId = ctx.reqParam.appId
    const data = DB.getList('workflow', (item) => {
        return appId == item.appId
    })

    console.log(appId, ctx.reqParam)
    ctx.body = createResBody({
        records: data,
        total: data.length || 0
    })
});

router.post('/wk/workflow/create', async (ctx, next) => {
    const id = DB.addData('workflow', ctx.reqParam)
    DB.addData('version', {id})
    ctx.body = createResBody({
        id
    })
});

router.post('/wk/workflow/remove', async (ctx, next) => {
    const id = DB.remove('workflow', ctx.reqParam.id)
    DB.remove('version', id)
    ctx.body = createResBody({
        id
    })
});

router.post('/wk/workflow/update', async (ctx, next) => {
    const id = DB.update('app', ctx.reqParam)
    ctx.body = createResBody({
        id
    })
});


router.post('/wk/version/detail', async (ctx, next) => {
    const appId = ctx.reqParam.id
    const data = DB.getDetail('version', appId)
    ctx.body = createResBody({
        ...data
    })
});

router.post('/wk/version/update', async (ctx, next) => {
    const id = DB.update('version', ctx.reqParam)
    ctx.body = createResBody({
        id
    })
});

module.exports = router
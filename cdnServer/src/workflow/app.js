const Router = require('@koa/router');
const { createResBody } = require("./utils")
const DB = require("../../db")

const router = new Router();
DB.createTable("app")

router.post('/wk/app/list', async (ctx, next) => {
    const pid = ctx.reqParam.pid
    const data = DB.getList('app', (item) => {
        return pid == item.pid
    })

    console.log(pid, ctx.reqParam)
    ctx.body = createResBody({
        records: data,
        total: data.length || 0
    })
});

router.post('/wk/app/create', async (ctx, next) => {
    const id = DB.addData('app', ctx.reqParam)
    ctx.body = createResBody({
        id
    })
});

router.post('/wk/app/remove', async (ctx, next) => {
    const id = DB.remove('app', ctx.reqParam.id)
    ctx.body = createResBody({
        id
    })
});

router.post('/wk/app/update', async (ctx, next) => {
    const id = DB.update('app', ctx.reqParam)
    ctx.body = createResBody({
        id
    })
});

module.exports = router
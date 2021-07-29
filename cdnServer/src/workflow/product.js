const Router = require('@koa/router');
const { createResBody } = require("./utils")
const DB = require("../../db")

const router = new Router();
DB.createTable("product")

router.post('/wk/getProductDetail', async (ctx, next) => {
    const data = DB.getDetail('product', ctx.reqParam.id)
    ctx.body = createResBody(data)
});

router.post('/wk/getProductList', async (ctx, next) => {
    const data = DB.getList('product')
    ctx.body = createResBody({
        records: data,
        total: data.length || 0
    })
});

router.post('/wk/createProduct', async (ctx, next) => {
    const id = DB.addData('product', ctx.reqParam)
    ctx.body = createResBody({
        id
    })
});

router.post('/wk/product/remove', async (ctx, next) => {
    const id = DB.remove('product', ctx.reqParam.id)
    ctx.body = createResBody({
        id
    })
});

router.post('/wk/product/update', async (ctx, next) => {
    const id = DB.update('product', ctx.reqParam)
    ctx.body = createResBody({
        id
    })
});

module.exports = router
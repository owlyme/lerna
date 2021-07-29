const Router = require('@koa/router');
const router = new Router();

router.get('/upload', async (ctx, next) => {
    ctx.body = 'upload'
});

router.post('/upload', async (ctx, next) => {
    ctx.body = ctx.request.files
});

module.exports = function (app) {
    app.use(router.routes()).use(router.allowedMethods());
}

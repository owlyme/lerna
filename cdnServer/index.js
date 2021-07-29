const Koa = require("./app.js");

const middlewares = require("./middleware")
const routers = require('./src')

const app = new Koa();
const port = 4000;

middlewares(app);
routers(app);

app.use((ctx) => {
    if (ctx.status == 404) {
        ctx.body = "<h1>404</h1>"
    }
});

const listener = app.listen(port, () => {
    console.log(`server is running: localhost:${port}`)
});
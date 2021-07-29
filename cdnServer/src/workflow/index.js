const productRouter = require("./product")
const appRouter = require("./app")
const workflowRouter = require("./workflow")
// const versionRouter = require("./version")



module.exports = function (app) {
    app.use(productRouter.routes()).use(productRouter.allowedMethods());
    app.use(appRouter.routes()).use(appRouter.allowedMethods());
    app.use(workflowRouter.routes()).use(workflowRouter.allowedMethods());
    // app.use(versionRouter.routes()).use(versionRouter.allowedMethods());
}
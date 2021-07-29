const path = require("path")
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const staticServe = require("koa-static");
const koaBody = require('koa-body')

module.exports = function(app) {
    // 允许跨域
    app.use(cors({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            maxAge: 2592000000, // 30天
        }))
        // 静态资源路径
    app.use(staticServe(path.resolve(__dirname, "../public")));

    // 上传
    app.use(koaBody({
        multipart:true, // 支持文件上传
        formidable:{
          uploadDir:path.resolve(__dirname,'../public/upload/'), // 设置文件上传目录
          keepExtensions: true,    // 保持文件的后缀
          maxFieldsSize:50 * 1024 * 1024, // 文件上传大小
          onFileBegin:(name,file) => { // 文件上传前的设置
            file.path = path.resolve(__dirname,'../public/upload/', file.name)
          },
        }
    }));

    // post
    app.use(bodyParser());
    let count = 0
        // 参数统一
    app.use(async(ctx, next) => {
        console.log(ctx.method, ctx.url)

        let reqParam = {}

        if (ctx.method === 'GET') {
            reqParam = ctx.query
        } else if (ctx.method === 'POST') {
            reqParam = ctx.request.body
        }
        delete reqParam.path

        ctx.reqParam = reqParam

        await next()
    });
}
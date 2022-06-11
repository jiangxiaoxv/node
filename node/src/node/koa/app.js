
const koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')
const koamount = require('koa-mount')
const koaCompose = require('koa-compose')
const path = require('path')
const fs = require('fs')
const util = require('util')

const app = new koa()
const path1 = path.join(__dirname, '../../knologne-img')

// 在最外层添加异常捕获的中间件方式1
app.use(async (ctx, next) => {
    try {
        await next()
    } catch(err) {
        ctx.status =  500
        ctx.body = '服务端内部错误'
        // ctx.app.emit('error', err, ctx) // 这样方式2就能捕获了
    }
})
// 在最外层添加异常捕获的中间件方式2,有1，2就不会生效了
app.on('error', (err) => {
    console.log(err)
})
app.use(
    koamount('/public', static(path1))
)

// app.use(static(path1))

const router = new Router()

router.get('/a', (ctx, next) => {
    ctx.body = ctx.path + 'b'
})
router.get('/b', (ctx, next) => {
    // ctx.body = ctx.path + 'bc'
    ctx.redirect('/a')
})
router.get('/users/:id', (ctx, next) => {
    console.log(ctx.params.id)
    ctx.body = ctx.path
})
// app.use(router.routes()).use(router.allowedMethods)



/* // koa 没有路由系统只有中间件功能
// ctx上下文对象
//   请求
//   响应
app.use(ctx => {
    
    // console.log(ctx.req.method)
    // console.log(ctx.req.url)
    // console.log(ctx.url)
    // ctx.res.end('res hello koa')
    // ctx.body = 'heelo Koa'
    const path = ctx.path

    // console.log(ctx)
    ctx.body = 'heelo Koa'

}) */


const one = (ctx, next) => {
    console.log('>> one')
    next()
    console.log('<< one')
}

const two = (ctx, next) => {
    console.log('>> two')
    next()
    console.log('<< two')
}
const three = (ctx, next) => {
    console.log('>> three')
    next()
    console.log('<< three')
}
// app.use(koaCompose([one, two]))
// app.use(one)
// app.use(two)
// app.use(three)

/* app.use(ctx => {
    ctx.body = 'woc'
}) */

app.use(async (ctx, next) => {
    try {
        // ctx.body = 'heelo'
        // next() // 无法拿到后面的结果
        await next()
    } catch(error) {
        // ctx.response = '服务端内部错误'
        // ctx.throw(500)
        // ctx.throw(404)
    }
})

app.use(async (ctx, next) => {
    const data = await util.promisify(fs.readFile)(('./readme.md'))
    await next()
    ctx.type = 'html'
    ctx.body = data
})
// app.use(one)

app.listen(8080, () => {
    console.log('server is running at http://localhost:8080')
}) 
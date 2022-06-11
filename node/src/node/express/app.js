
const express = require('express')
const router = require('./router_middle')

const app = express()
app.use(express.json()) // 为req.body做准备
app.use(express.urlencoded()) // 解析formdata类型的数据

// 挂载路由
// app.use(router)
app.use('/app', router)

// 中间件
const myLogger = (req, res, next) => {
    console.log(req.method, req.url, new Date().toLocaleDateString())
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    next()
}
// 不关心请求路径的应用程序中间件
app.use([myLogger])

app.get('/', (req, res, next) => {
    res.statusCode = 200

    // console.log(req.url)
    // console.log(req.method)

    // res.send('hello 刘琼琼')

    // res.write('a')
    // res.write('b')

    // res.end('hello world')
    // console.log(req.params)
    // res.cookie('foo', 'bar')
    try {
        console.log(req.query)
        next()
        res.status(200).json({foo: 'bar'})
    } catch(err) {
        next(err)
    }
    
})

/* // 限定请求路径， 请求方法的中间件
app.get('/user/:id', (req, res) => {})

// 多个处理函数的中间件
app.get('/user/:id', (req, res, next) => {
    // next()
    next('route') // 跳过下一个处理回调函数，传递个下一个中间件
    
}, (req, res, next) => {}) */


// 在所有的中间件之后挂载错误处理中间件,一定是四个形参
app.use((err, req, res, next) => {
    console.log('错误', err)
    res.status(500).json({
        error: err.message
    })
})

// 通常在所有的路由之后配置处理404的内容
// 从上倒下依次匹配中间件
app.use((req, res, next) => {
    res.status(404).send('404 not found')
})

// get, post, delete, put....
app.all('/secret', function(req, res, next) {})

app.get('/ab?cd', function(req, res, next) {
    res.sendFile()
})
// * 表示任意（0个或多个）
app.get('/ab*cd', function(req, res, next) {
    res.redirect('/abc')
})

// 只要有a就匹配
app.get(/a/, function(req, res, next) {
    res.jsonp()
})

// 只要有a就匹配
app.get(/.*fly$/, function(req, res, next) {
    res.render()

})
app.get('/users/:id', function(req, res, next) {
    console.log(req.params.id)
    res.send('get /users/:id')
})
app.get('/user/:userId(\\d+)', (req, res, next) => {
    res.send('user/:userid(\\d+)')
})


app.listen(8080, (err) => {
    console.log(`Server running at http://localhost:8080`)
})


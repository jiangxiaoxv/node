
const http = requrie('http')
const context = requrie('./context')
const request = requrie('./request')
const response = requrie('./response')

class Application {
    constructor() {
        this.middleware = []
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
    use(fn) {
        this.middleware.push(fn)
    }
    // 异步递归遍历调用中间件处理函数
    compose(middleware) {
        return function(context) {
            const dispath = index => {
                if(index >= middleware.length) {
                    return Promise.resolve()
                }
                const fn = middleware[index]
                // todo 上下文对象
                return Promise.resolve(fn(context, () => {
                    dispath(index + 1)
                }))
            }

            // 返回第一个中间件处理函数
            return dispath(0)
        }
    }
    // 构造上下文对象
    createContext() {

    }
    callback() {
        const fnMiddleware = this.compose(this.middleware)
        const handleRequese = (req, res) => {
            // 每个请求都会创建一个独立的context对象，它们之间不会互相污染
            const context = this.createContext()
            fnMiddleware(context).then(() => {
                // console.log('end')
                res.end(context.body)
            }).catch(err => {
                console.log('err', err
                )
            })
        }
        return handleRequese
    }
}

module.exports = Application

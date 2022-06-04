
const http = require('http')
const url = require('url')


const server = http.createServer((req, res) => {
    
    // 请求路径
    let {pathname, query} = url.parse(req.url, true)
    // console.log(pathname, query)

    // 请求方式
    // console.log(req.method)
    // console.log(req.httpVersion)
    // console.log(req.headers)

    // 请求提数据获取
    let arr = []
    req.on('data', (data) => {
        arr.push(data)
    })
    req.on('end', () => {
        console.log(Buffer.concat(arr).toString())
    })



})

server.listen(8080, () => {
    console.log('server is start.....')
})
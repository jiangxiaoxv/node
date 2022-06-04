
const http = require('http')

const server = http.createServer((req, res) => {
    console.log('请求进来了')
    let arr = []

    req.on('data', (data) => {
        arr.push(data)
    })
    req.on('end', () => {
        console.log(Buffer.concat(arr).toString())
        res.setHeader('Content-type', 'text/html;charset=utf-8')
        res.end('拿到了客户端的数据')
    })
})

server.listen(8081, () => {
    console.log('外部服务端启动了')
})

server.on('error', (error) => {
    console.log(error)
})
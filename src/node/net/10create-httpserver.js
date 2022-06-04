
const http = require('http')

let server = http.createServer((req, res) => {
    // 针对于请求和响应完成各自的操作
    console.log('111')
    res.end('wocaoqiong')
})

server.listen(8080, 'localhost')

server.on('listening', () => {
    console.log('服务器启动了')
})

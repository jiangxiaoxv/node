
const net = require('net')

const server = net.createServer()

const PORT = 8080
const HOST = 'localhost'

server.listen(PORT, HOST)

server.on('listening', () => {
    console.log(`服务端已经开启在${HOST}:${PORT}`)
})

// 接收消息 会写消息
server.on('connection', (socket) => {
    socket.on('data', (chunk) => {
        const msg = chunk.toString()
        console.log(msg)
        // 回数据
        socket.write(Buffer.from('刘琼琼说: 嗯'))
    })
})

server.on('close', () => {
    console.log('服务端关闭了')
})

server.on('error', (error) => {
    if(error.code === 'EADDRINUSE') {
        console.log('地址正在被使用')
    } else {
        console.log(error)
    }
})
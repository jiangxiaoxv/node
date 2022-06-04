
const net = require('net')

let server = net.createServer()

server.listen(8080, 'localhost')

server.on('listening', () => {
    console.log('服务器启动了')
})

server.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log(data.toString())
    })
    socket.write(Buffer.from('test http request'), (err) => {
        console.log('>>>>>>>>>>>>>1')
        console.log(err)
    })
})

server.on('error', (err) => {
    console.log('>>>>>>>>>>>>>2')

    console.log(err)
})
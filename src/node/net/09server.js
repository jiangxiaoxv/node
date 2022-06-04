const net = require('net')
const MyTransformCode = require('./08myTransform')

const server = net.createServer()

let overageBuffer = null
let ts = new MyTransformCode()

server.listen('8080', 'localhost')

server.on('listening', () => {
    console.log('服务端运行了在8080')
})

server.on('connection', (socket) => {
    socket.on('data', (chunk) => {
        const msg = chunk.toString()

        if (overageBuffer) {
            chunk = Buffer.concat([overageBuffer, chunk])
        }

        let packageLen = 0
        console.log(chunk)
        console.log('----', ts.getPackageLen(chunk))
        while(packageLen = ts.getPackageLen(chunk)) {
            const packageCon = chunk.slice(0, packageLen)
            chunk = chunk.slice(packageLen)

            const ret = ts.decode(packageCon)
            console.log(ret)
            socket.write(ts.encode(ret.body, ret.serialNum))

        }
        overageBuffer = chunk
    })
})
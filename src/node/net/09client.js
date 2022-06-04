const net = require('net')


const client = net.createConnection({
    host: 'localhost',
    port: 8080
})
const MyTransformCode = require('./08myTransform')
let overageBuffer = null
let ts = new MyTransformCode()

client.write(ts.encode('拉勾教育', 1))
client.write(ts.encode('拉勾教育'))
client.write(ts.encode('拉勾教育'))
client.write(ts.encode('拉勾教育'))


client.on('data', (chunk) => {
    if (overageBuffer) {
        chunk = Buffer.concat([overageBuffer, chunk])
    }

    let packageLen = 0

    while(packageLen = ts.getPackageLen(chunk)) {
        const packageCon = chunk.slice(0, packageLen)
        chunk = chunk.slice(packageLen)

        const ret = ts.decode(packageCon)
        console.log(ret)
        
    }
    overageBuffer = chunk
})
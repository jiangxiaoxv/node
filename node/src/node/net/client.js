
const net = require('net')

const client = net.createConnection({
    port: 8080,
    host: 'localhost'
})

let dataArr = [
    '姜',
    '晓',
    '许',
    '发',
    '大',
    '财',
    '了'
]

client.on('connect', () => {
    client.write('您好:我是客户端，傻缺刘琼琼\n')
    for (let i = 0; i < dataArr.length; i++) {
        (function(val, index) {
            setTimeout(() => {
                client.write(val)
            }, 1000 * (index + 1));
        })(dataArr[i], i)
    }
})
client.on('data', (chunk) => {
    console.log(chunk.toString())
})

client.on('error', (error) => {
    console.log(error)
})

client.on('close', () => {
    console.log('客户端断开链接')
})

const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, '../json/text3.txt')


const ws = fs.createWriteStream(filePath, {
    flags: 'w',
    mode: 438,
    fd: null,
    encoding: 'utf-8',
    start: 0,
    highWaterMark: 3
})
/* // 不能写入数字
ws.write('刘xx', () => {
    console.log('数据写完了')
})

ws.write('1234', () => {
    console.log('数据写完了ok')
}) */

ws.on('open', (fd) => {
    console.log('open', fd)
})

ws.write('1')

ws.end()
// close 是在数据写入操作全部完成之后再执行
ws.on('close', () => {
    console.log('文件关闭了')
})

ws.on('error', (err) => {
    console.log('出错了')
})

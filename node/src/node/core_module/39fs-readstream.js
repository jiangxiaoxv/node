
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, '../json/text.txt')
// console.log(filePath)

let rs = fs.createReadStream(filePath, {
    flags: 'r',
    encoding: null,
    fd: null,
    mode: 438,
    autoClose: true,
    start: 0, 
    // end: 3,
    highWaterMark: 10
})
/* 
rs.on('data', (chunk) => {
    console.log(chunk.toString())
    rs.pause()
    setTimeout(() => {
        rs.resume()
    }, 1000)
}) */
// 告知缓冲区有数据了
/* rs.on('readable', () => {
    let data
    while((data = rs.read(5)) != null) {
        console.log(data.toString())
        console.log(rs._readableState.length + '-------')
    }
    // let data = rs.read(10)
    // if (data) {
    //     console.log(data.toString())
    //     console.log(rs._readableState.length + '-------')
    // }
}) */

rs.on('open', (fd) => {
    console.log(fd, '文件打开了')
    // rs.close()
})

rs.on('end', (err) => {
    console.log(Buffer.concat(bufferArr).toString())
    console.log(err, '结束了')
})

// 数据被消费之后，或者手动关闭才会触发close事件
rs.on('close', (err) => {
    console.log(err, '文件关闭了')
})

let bufferArr = []
rs.on('data', (chunk) => {
    if(chunk) {
        bufferArr.push(chunk)
        // console.log(chunk.toString())
    }
})

rs.on('error', () => {
    console.log('出错了')
})
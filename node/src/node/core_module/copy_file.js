
const fs = require('fs')
const path = require('path')
const { exit } = require('process')

let buf = Buffer.alloc(10)
let path1 = path.resolve(__dirname, '../json/test.txt')
let path2 = path.resolve(__dirname, '../json/test2.txt')
/* 
fs.open(path1, 'r', (err, rfd) => {
    fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
        fs.open(path2, 'w', (err, wfd) => {
            fs.write(wfd, buf, 0, 10, 0, (err, written) => {
                fs.close(wfd)
                fs.close(rfd)
            })
        })
    })
}) */
const BUFFER_SIZE = buf.length
let readOffset = 0

fs.open(path1, 'r', (err, rfd) => {
    fs.open(path2, 'w', (err, wfd) => {
        next()
        function next() {
            fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {

                if (!readBytes) {
                    // 如果条件判断成立，说名内部数据已经读取完毕
                    fs.close(rfd, () => {})
                    fs.close(wfd, () => {})
                    console.log('拷贝完成')
                    return
                }
                readOffset += readBytes
                fs.write(wfd, buf, 0, readBytes, (err, written) => {
                    next()
                })
            })
        }
    })
})

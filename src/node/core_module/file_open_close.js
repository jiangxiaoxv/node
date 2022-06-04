const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, '../json/test.txt')
// open
/* fs.open(filePath, 'r', (err, fd) => {
    console.log(fd)
}) */



// close
/* fs.open(filePath, 'r', (err, fd) => {
    console.log(fd)
    fs.close(fd, err => {
        if (!err) {
            console.log('关闭成功')
        }
    })
}) */



// read: 所谓的读取操作就是将数据从磁盘文件中写入到buffer中
let buf = Buffer.alloc(10)
/**
 * fd定位当前被打开的文件
 * buf用于表示当前缓冲区
 * offset表示当前从buf的那个位置开始执行写入
 * length表示当前次写入的长度
 * position表示当前从文件的那个位置开始读取
 * 
 * 
 */
/* fs.open(filePath, 'r', (err, fd) => {
    if (err) {
        console.log(err)
        return;
    }
    fs.read(fd, buf, 1, 4, 2, (err, readBytes, data) => {
        console.log(readBytes)
        console.log(data)
        console.log(data.toString())
        
    })
}) */


// write 将缓冲区里的内容写入到磁盘文件中
let buf2 = Buffer.from('1234567890')
const filePath2 = path.resolve(__dirname, '../json/test2.txt')
fs.open(filePath2, 'w', (err, wfd) => {
    fs.write(wfd, buf2, 1, 3, 0, (err, written, buffer) => {
        console.log(written)
        console.log(buffer)
        console.log(buffer.toString())

        fs.close(wfd)
    })
})

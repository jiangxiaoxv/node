const fs = require('fs')
const path = require('path')
const filePath = path.join(path.resolve(__dirname), '../json/test.txt')


// readFile
/* fs.readFile(filePath, 'utf-8', (err, data) => {
    if (!err) {
        console.log(data.toString())
    } else {
        console.log(err)
    }
}) */

// writeFile
/* fs.writeFile(filePath, 'hello node.js', {
    mode: 438, // 可读可写
    flag: 'w+',
    encoding: 'utf-8'
}, (err) => {
    if (!err) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (!err) {
                console.log(data.toString())
            } else {
                console.log(err)
            }
        })
    }
}) */

// appendFile
/* fs.appendFile(filePath, ' 拉勾教育', (err) => {
    if (!err) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (!err) {
                console.log(data.toString())
            } else {
                console.log(err)
            }
        })
    }
}) */

// copyfile(一次性写入，不适合大文件操作)
/* let copyPath = path.join(path.resolve(__dirname), '../json/text2.txt')
fs.copyFile(filePath, copyPath, (err) => {
    fs.readFile(copyPath, 'utf-8', (err, data) => {
        if (!err) {
            console.log(data.toString())
        } else {
            console.log(err)
        }
    })
}) */

// watchFile
/* fs.watchFile(filePath, {interval: 20}, (curr ,prev) => {
    if (curr.mtime !== prev.mtime) {
        console.log('修改了文件')
        fs.unwatchFile(filePath)
    }
}) */

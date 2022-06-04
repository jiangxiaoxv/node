const fs = require('fs')
const path = require('path')

let path1 = path.resolve(__dirname, '../json/test.txt')
let path2 = path.resolve(__dirname, '../json/test2.txt')
/* 
fs.access(path1, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('有操作权限')
    }
}) */

/* fs.stat(path1, (err, statObj) => {
    console.log(statObj.size)
    console.log(statObj.isFile())
    console.log(statObj.isDirectory())
}) */

/* fs.mkdir(`${__dirname}/a/b/c`,{recursive: true} , (err) => {
    if(!err) {
        console.log('创建成功')
        
    } else {
        console.log(err)
    }
}) */

// 默认删除非空目录
// recursive: true 递归操作
/* fs.rmdir(`${__dirname}/a`,{recursive: true} ,(err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('删除成功')
    }
}) */

/* fs.readdir(`${__dirname}/a`, (err, files) => {
    console.log(files)
}) */

fs.unlink(path2, (err) => {
    if (!err) {
        console.log('删除成功')
    }
})


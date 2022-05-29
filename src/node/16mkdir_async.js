
const fs = require('fs')
const path = require('path')

/* function mkDir(dirPath, cb) {
    let parts = dirPath.split('/')
    let index = 1
    next()
    function next() {
        if (index > parts.length) {
            return cb && cb()
        }
        let current = parts.slice(0, index++).join('/')
        fs.access(current, (err) => {
            if (err) {
                fs.mkdir(current, next)
            } else {
                next()
            }
        })
    }
}
mkDir('./a/b/c', () => {
    console.log('创建成功')
}) */


const {promisify} = require('util')
// 将access 与 mkdir 处理成async... 风格
const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

async function myMkDir(dirPath, cb) {
    let parts = dirPath.split(path.sep)

    for (let index = 1; index <= parts.length; index++) {
        let current = parts.slice(0, index).join(path.sep)
        
        try {
            await access(current)
        } catch(err) {
            await mkdir(current)
        }

    }
    cb && cb()
}

myMkDir('a/b/c', () => {
    console.log('创建成功')
})
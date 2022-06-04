
const fs = require('fs')
const path = require('path')

const {promisify} = require('util')


function myRmdir(dirPath, cb) {
    const statObj = fs.statSync(dirPath)
    if (statObj.isDirectory()) {
        const files = fs.readdirSync(dirPath)
        let dirs = files.map(item => {
            return path.join(dirPath, item)
        })
        next(dirs)
        fs.rmdirSync(dirPath)
    } else {
        fs.unlinkSync(dirPath)
    }
}


function next(dirs) {
    
    if (Array.isArray(dirs)) {
        for (let i = 0; i < dirs.length; i++) {
            myRmdir(dirs[i])
        }
    }

}
/* myRmdir('a', () => {
    console.log('删除完毕')
}) */

console.log(module)


const fs = require('fs')
const path = require('path')

/**
 * 01 调用时需要接收类似于a/b/c，这样的路径，它们是
 *    采用 / 去连接
 * 02 利用 / 分割符将路径进行拆分，将每一项放入一个数组中进行管理
 *    ['a', 'b', 'c]
 * 03 对上述的数据进行便利，我们需要拿到每一项，然后与前一项进行拼接 /
 * 04 判断一个当前对拼接之后的路径是否具有可操作的权限，如果有则证明
 *    存在，否则的话就需要执行创建
 */

function makeDirSync(dirPath) {
    let items = dirPath.split(path.sep)
    if (Array.isArray(items)) {
        for (let i = 1; i <= items.length; i++) {
            let dir = items.slice(0, i).join(path.sep)
            try {
                // fs.accessSync(dir)
                fs.accessSync(__filename)
            } catch(err) {
                // fs.mkdirSync(dir)
                console.log(err)
            }
        }
    }
}
const rootPath = path.resolve(__dirname)
// makeDirSync(`${rootPath}`)
makeDirSync(`a/b/c`)



// 1. 资源： cpu 内存
// const fs = require('fs')
// Buffer.alloc(1000)
// console.log(process.memoryUsage()) // 内存

// console.log(process.cpuUsage()) // cpu



// 运行环境：运行目录，node环境，cpu架构，用户环境，系统平台
/* console.log(process.cwd()) 
console.log(process.version)
console.log(process.versions)
console.log(process.arch)
console.log(process.env.NODE_ENV) // 默认undefined
console.log(process.env.PATH) // node的环境变量
console.log(process.env.USERPROFILE || process.env.HOME) // 本机的管理员目录,不同平台不一样
console.log(process.platform) // 操作系统 */


/* // 运行状态：启动参数，PID，进程运行时间
console.log(process.argv) // 数组，1. node命令 2. process进程
console.log(process.argv0) // node
console.log(process.argv1) // undefined
console.log(process.pid) // 进程id
console.log(process.ppid)
setTimeout(() => {
    console.log('g')
    console.log(process.uptime()) // 运行时间(文件，程序运行时间)

}, 3000) */


/* 
// 4 事件监听
process.on('exit', (code) => {
    console.log('exit' + code)
    setTimeout(() => {
        console.log(12) // 不会被执行
    })
})
process.on('beforeExit', (code) => {
    console.log('before exit' + code) // 手动执行process.exit()不会被执行
})
process.exit(1)
console.log('代码执行完毕') // 不会被执行了 */




// 5 标准输出 输入 错误
/* console.log = function(data) {
    process.stdout.write('----' + data + `\n`)
}
console.log(23)
const path = require('path')
const fs = require('fs')
const filepath = path.join(__dirname, '../json/test.txt')
fs.createReadStream(filepath).pipe(process.stdout)

process.stdin.pipe(process.stdout)

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', () => {
    let chunk = process.stdin.read()
    if (chunk != null) {
        process.stdout.write('data' + chunk)
    }
}) */
















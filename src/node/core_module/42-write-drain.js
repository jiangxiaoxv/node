
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, '../json/text3.txt')
console.log(filePath)


let ws = fs.createWriteStream(filePath, {
    highWaterMark: 3,
})
let flag = ws.write('1')
flag = ws.write('2')
// flag = ws.write('3')
// 如果flag为false， 并不是说明当前数据不能被执行写入
// 第一次调用write方法时候将数据直接写入到文件中
// 第二次开始write方法就是将数据写入至缓存中
// 生产速度和消费速度不一样，一般情况下生产速度要比消费速度快很多
// 当flag为false之后，并不意味着当前次的数据不能被写入了
// 但是我们应该告知数据的生产者，当前的消费速度已经跟不上生产
// 速度了，一般我们会将可读流的模块修改为暂停模式
// 当数据生产暂停之后，消费回缓慢的消化它内部缓存中的数据，直到可以再次被
// 执行写入操作
// 当缓存区可以继续写入数据时，如何让生产者知道 drain事件

console.log(flag)
ws.on('drain', () => {
    console.log('11')
})
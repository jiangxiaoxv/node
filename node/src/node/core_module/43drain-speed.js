 
 /**
  * 需求：‘jxx’ 写入指定的文件
  * 01 一次性写入
  * 02 分批写入
  * 对比：
  */

const fs = require('fs')
const path = require('path')
  
const filePath = path.resolve(__dirname, '../json/text3.txt')

let ws = fs.createWriteStream(filePath, {
    highWaterMark: 3
})
//  ws.write('jxx')

let source = '俊哥喜欢大'.split('')
let flag = true
let i = 0;

function executeWrite() {
    
    while (i < source.length && flag) {
        flag = ws.write(source[i])
        i++
    }
}
executeWrite()

ws.on('drain', () => {
    console.log('drain')
    flag = true
    executeWrite()
})
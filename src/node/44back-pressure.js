const fs = require('fs')
const path = require('path')
  
const filePath2 = path.resolve(__dirname, '../json/text3.txt')
const filePath1 = path.resolve(__dirname, '../json/text.txt')

let rs = fs.createReadStream(filePath1, {
    highWaterMark: 4
})

let ws = fs.createWriteStream(filePath2, {
    highWaterMark: 1
})

let flag = true

rs.on('data', (chunk) => {
    flag = ws.write(chunk, () => {
        console.log('写完了')
    })
    if (!flag) {
        rs.pause()
    }
})

ws.on('drain', () => {
    rs.resume()
})



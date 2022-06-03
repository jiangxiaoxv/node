
const fs = require('fs')
const path = require('path')
const path1 = path.join(__dirname, '../json/text.txt')
const path2 = path.join(__dirname, '../json/text2.txt')

let rs = fs.createReadStream(path1)
let ws = fs.createWriteStream(path2)

rs.pipe(process.stdout)
rs.pipe(ws)

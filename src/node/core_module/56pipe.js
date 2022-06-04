
const fs = require('fs')
const EventsEmitter = require('events')

// const MyFileReadStream = require('./45-read-stream.js')
const path = require('path')
const filePath = path.join(path.resolve(__dirname), '../json/text.txt')
const filePath2 = path.join(path.resolve(__dirname), '../json/text2.txt')


const rs = fs.createReadStream(filePath, {
    highWaterMark: 4
})

const ws = fs.createWriteStream(filePath2, {
    highWaterMark: 1
})

rs.pipe(ws)
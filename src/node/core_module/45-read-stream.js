
const fs = require('fs')
const path = require('path')
const filePath = path.join(path.resolve(__dirname), '../json/text.txt')


const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {

    constructor(path, options = {}) {
        super()
        this.path = path
        this.flags = options.flags || 'r'
        this.mode = options.mode || 438
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.end = options.end
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.readOffset = 0
        this.open()

        this.on('newListener', (type) => {
            if (type == 'data') {
                this.read()
            }
        })
    }
    read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', this.read)
        }
        let buf = Buffer.alloc(this.highWaterMark)
        let howMunchToRead

        if (this.end) {
            howMunchToRead = Math.min(this.end - this.readOffset, this.highWaterMark)
        } else {
            howMunchToRead = this.highWaterMark
        }
        
        fs.read(this.fd, buf, 0, howMunchToRead, this.readOffset, (err, readBytes) => {
            if (readBytes) {
                this.readOffset += readBytes
                this.emit('data', buf.slice(0, readBytes))
                this.read()
            } else {
                this.emit('end')
                this.close()
            }
        })
    }
    close() {
        fs.close(this.fd, (err) => {
            this.emit('close', err)
        })
    }
    open() {
        // 原生open方法来打开指定位置上的文件
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit('error', err)
                return
            }
            this.fd = fd
            this.emit('open', fd)
        })
    }
    pipe(ws) {
        this.on('data', (data) => {
            let flag = ws.write(data)
            if (!flag) {
                this.pause()
            }
        })
        ws.on('drain', () => {
            this.resume()
        })
    }
}

let rs = new MyFileReadStream(filePath, {
    end: 7,
    highWaterMark: 3
})

/* rs.on('open', (fd) => {
    console.log('open', fd)
})

rs.on('error', (err) => {
    console.log(err)
}) */


/* rs.on('data', (chunk) => {
    console.log(chunk.toString())
})

rs.on('end', () => {
    console.log('end')
})

rs.on('close', () => {
    console.log('close')
})
 */

module.exports = MyFileReadStream
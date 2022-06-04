
const fs = require('fs')
const EventsEmitter = require('events')

const {Queue} = require('./52-linked-queue')
const path = require('path')
const filePath = path.join(path.resolve(__dirname), '../json/text.txt')


class MyWriteStream extends EventsEmitter {
    constructor(path, options = {}) {
        super()
        this.path = path
        this.flags = options.flags || 'w'
        this.mode = options.mode || 438
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.encode = options.encode || 'utf-8'
        this.highWaterMark = options.highWaterMark || 16 * 1024

        this.writeOffset = this.start
        this.writing = false
        this.writeLen = 0

        this.needDrain = false
        this.cache = new Queue()

        this.open()
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err)
                return;
            }
            this.fd = fd
            this.emit('open', fd)
        })
    }

    write(chunk, encoding, cb) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

        this.writeLen += chunk.length
        let flag = this.writeLen < this.highWaterMark
        this.needDrain = !flag

        if (this.writing) {
            // 当前正在执行写入，所以内容应该排队
            this.cache.enQueue({chunk, encoding, cb})

        } else {
            this.writing = true
            // 当前不是正在写入那么就执行写入
            this._write(chunk, encoding, () => {
                cb()
                // 清空排队的内容
                this._clearBuffer()
            })
        }

        return flag
    }

    _write(chunk, encoding, cb) {
        if (typeof this.fd != 'number') {
            return this.once('open', () => {return this._write(chunk, encoding, cb)})
        }

        fs.write(this.fd, chunk, this.start, chunk.length, this.writeOffset, (err, writelen) => {
            this.writeOffset += writelen
            this.writeLen -= writelen

            cb && cb()

        })
    }

    _clearBuffer() {
        let data = this.cache.deQueue()
        if (data) {
            const {chunk, encoding, cb} = {...data.element}
            this._write(chunk, encoding, () => {
                cb && cb()
                this._clearBuffer()
            })
        } else {
            this.writing = false
            if (this.needDrain) {
                this.needDrain = false
                this.emit('drain')
            }
        }
    }


}

const ws = new MyWriteStream(filePath)

ws.on('open', (fd) => {
    // console.log('open ---->', fd)
})

ws.write('jxx', 'utf-8', () => {
    console.log('ok0')
})
let flag = ws.write('10', 'utf-8', () => {
    console.log('ok1')
})

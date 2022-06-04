
const {Readable} =  require('stream')

// 模拟底层数据
let source = ['lg', 'zce', 'syy']

// 自定义类继承readable
class MyReadable extends Readable {
    constructor(source) {
        super()
        this.source = source
    }

    _read() {
        let data = this.source.shift() || null
        this.push(data)
    }
}

// 实力化
let myReadable = new MyReadable(source)
/* myReadable.on('readable', (err) => {
    let data = null
    while((data = myReadable.read()) != null) {
        console.log(data.toString())
    }
}) */

myReadable.on('data', (chunk) => {
    console.log(chunk.toString())
})
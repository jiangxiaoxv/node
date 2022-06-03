
let {Transform} = require('stream')

class MyTransform extends Transform {

    constructor() {
        super()
    }

    _transform(chunk, en, cb) {
        // 放到可读流中
        this.push(chunk.toString().toUpperCase())
        cb()
    }

}

let t = new MyTransform()
t.write('a')
t.on('data', (chunk) => {
    console.log(chunk.toString())
})
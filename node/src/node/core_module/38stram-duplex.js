
let {Duplex} = require('stream')

class MyDubplex extends Duplex {
    constructor(source) {
        super()
        this.source = source
    }

    _read() {
        let data = this.source.shift() || null
        this.push(data)
    }

    _write(chunk, en, next) {
        process.stdout.write(chunk)
        process.nextTick(next)
    }

}

let source = ['a', 'b', 'c']
let myDubplex = new MyDubplex(source)

/* myDubplex.on('data', (chunk) => {
    console.log(chunk.toString())
}) */

myDubplex.write('liuchacha', () => {
    console.log('end')
})
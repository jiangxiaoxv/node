
// IO函子
const fp = require('lodash/fp')
const fs = require('fs')
const path = require('path')
let filePath = path.join(__dirname, '../../package.json')


class IO {

    static of(value) {
        return new IO(function() {
            return value
        })
    }

    constructor(fn) {
        this._value = fn
    }

    map (fn) {
        return new IO(fp.flowRight(fn, this._value))
    }

    // Monad函子
    join() {
        return this._value()
    }

    flatMap(fn) {
        return this.map(fn).join()
    }
}

/* // 调用
const r = IO.of(process).map(p => p.execPath)
console.log(r._value())   */


let readFile = function(filename) {

    return new IO(function() {
        return fs.readFileSync(filename, 'utf-8')
    })
}

let print = function(x) {
    return new IO(function() {
        console.log(x)
        return x
    })
}

/* let cat = fp.flowRight(print, readFile)
let r = cat(filePath)._value()._value()
console.log(r) */

let r = readFile(filePath)
        // .map(x => x.toUpperCase())
        .map(fp.toUpper)
        .flatMap(print)
        .join()
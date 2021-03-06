const fp = require('lodash/fp')

// Functor 函子
/* class Container {

    constructor(value) {
        this._value = value
    }

    map(fn) {
        return new Container(fn(this._value))
    }
}

let r = new Container(5).map(x => x + 1).map(x => x * x)
console.log(r) */

class Container {
    static of (value) {
        // value 为null就是副作用
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }

    map(fn) {
        return Container.of(fn(this._value))
    }

    value(f) {
        return f(this._value)
    }
}
let r = Container.of(5).map(x => x + 1).map(x => x * x).map(x => {
    console.log(x)
    return x
})
// console.log(r)
Container.of(null).map(x => x.toUpperCase())


/* const cache = {}
const s = Symbol('foo')
cache[Symbol()] = '123'
cache[Symbol('foo')] = 'foo'
console.log(cache)

let f = Symbol.for('for')
let a = Symbol.for('for')
console.log(a === f) */

const name = Symbol()
const person = {
    [name]: 'jxx',
    say() {
        console.log(this[name])
    }
}
/* person.say()
console.log(person[name])
console.log(Symbol.for(true) === Symbol.for('true')) // treu
 */
// console.log(Symbol.iterator)
// console.log(Symbol.hasInstance)

const obj = {
    [Symbol.toStringTag]: 'XObject'
}
console.log(obj.toString())

// for in , Object.keys 是拿不到symbol的
// JSON.stringify(obj) 也拿不到
console.log(Object.getOwnPropertySymbols(obj))
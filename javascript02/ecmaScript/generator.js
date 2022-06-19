
/* function * foo() {
    console.log('jxx')
    return 100
}

const result = foo()
console.log(result.next()) // {value: 100, done: true} */

/* function * foo() {

    console.log('1111')
    yield 100
    console.log('2222')
    const r2 = yield 200
    console.log('3333', r2)
    yield 100
}
const g = foo()
g.next()
g.next(3)
console.log(g.next(5))
console.log(g.next()) */

/* function * crateMaker() {
    let id = 1
    while(true) {
        yield id++
    }
}
const idMaker = crateMaker()
console.log(idMaker.next()) */

const obj = {
    store: ['foo', 'bar', 'bar'],
    index: 1,
    name: 'jxx',
    [Symbol.iterator] () {
        function * generator() {
            for (let key in obj) {
                yield obj[key]
            }
        }
        return generator()
    }
}
for (let item of obj) {
    console.log(item)
}

function * foo() {
    console.log('start')
    try {
        const res = yield 'foo'
        console.log(res)
    } catch(e) {
        console.log(e)
    }
}

/* const generator = foo()

const result = generator.next()
console.log(result)

const result1 = generator.next('bar')
console.log(result1)
 */
// generator.throw(new Error('hah'))

// const ajax = require('./promiseAjax')s

/* function * main () {
    const users = yield ajax('../readme.md')
    console.log(users)
}

const g = main()
const result = g.next()
result.value.then(data => {
    console.log(1)
    g.next(data)
}) */

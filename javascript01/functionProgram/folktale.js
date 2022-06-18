// folktale
const {compose, curry} = require('folktale/core/lambda')
const {toUpper, first} = require('lodash/fp')
const {split, find} = require('lodash/fp')
const path = require('path')
/* let f = curry(3, (x, y) => {
    return x + y
}) */

/* console.log(f(1, 2)(2))
console.log(f(1)(2)(3)) */

/* let f = compose(toUpper, first)
console.log(f(['one', 'two'])) */

// task 异步任务
const fs = require('fs')
const {task} = require('folktale/concurrency/task')

function readFile(filename) {
    return task(resolver => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
                resolver.reject(err)
            } else {
                resolver.resolve(data)
            }
        })
    })
}
let filePath = path.join(__dirname, '../../package.json')
let r = readFile(filePath)
            .map(split('\n'))
            .map(find(x => x.includes('version')))
            .run()
            .listen({
                onRejected: err => {
                    console.log(err)
                },
                onResolved: value => {
                    console.log(value)
                }
            })
// console.log(r)
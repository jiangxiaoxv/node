/* // 函数组合演示
function compose (f, g) {
    return function(value) {
        return f(g(value))
    }
}

function reverse (array) {
    return array.reverse()
}

function first(array) {
    return array[0]
}

const last = compose(first, reverse) */
// console.log(last(['abcd', 'bc']))

const _ = require('lodash')
const fp = require('lodash/fp')
/* const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()
const f = _.flowRight(toUpper, first, reverse)
console.log(f(['one', 'two', 'threes']))
 */


/* 
function compose(...args) {
    return function(value) {
        return args.reverse().reduce((acc, fn) => {
            return fn(acc)
        }, value)
    }
} */

// const f = compose(toUpper, first, reverse)
// console.log(f(['one', 'two', 'threes']))

/* const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)
const f = compose(toUpper, first, reverse)
console.log(f(['one', 'two', 'threes'])) */

// const f = _.flowRight(_.toUpper, _.first, _.reverse)
// const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
// console.log(f(['one', 'two', 'threes']))

// _.split()
const split = _.curry((sep, str) => {
    return _.split(str, sep)
})

// _.toLower()

const join = _.curry((sep, array) => {
    return _.join(array, sep)
})
const map = _.curry((fn, array) => _.map(array, fn))
/* const log = (v) => {
    console.log(v)
    return v
} */
const trace = _.curry((tag, v) => {
    console.log(tag, v)
    return v
})
// const f = _.flowRight(join('-'), map(_.toLower), log, split(' '))
// const f = _.flowRight(join('-'), map(_.toLower), split(' '))

// const f = _.flowRight(join('-'), trace('map之后'), map(_.toLower), trace('split之后'), split(' '))
// console.log(f('NEVER SAY DIE'))

/* const fp = require('lodash/fp')
const f = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(' '))
console.log(f('NEVER SAY DIE')) */

console.log(_.map(['23', '8', '10'], parseInt)) // [23, NaN, 2]
console.log(_.map(['23', '8', '10'], fp.parseInt(10))) // [23, 8, 10]
console.log(fp.map(parseInt, ['23', '8', '10'])) // [23, 8, 10]





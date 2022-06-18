
const _ = require('loadsh')

const array = ['jack', 'jxx']

// console.log(_.first(array))
// console.log(_.last(array))
// console.log(_.toUpper(_.first(array)))
// console.log(_.reverse(array))
// console.log(array)
// const r = _.each(array, (item, index, arr) => {
//     console.log(item, index)
// })
// console.log(r)

/* const index = array.findIndex((item) => {
    return item == 'jxx'
}) */

// console.log(index)

function getArea(r) {
    console.log('haha')
    return Math.PI * r * r
}

// let getAreaWithMemory = _.memoize(getArea)
// console.log(getAreaWithMemory(10))
// console.log(getAreaWithMemory(10))
// console.log(getAreaWithMemory(10))

// 模拟memoize方法的实现
function memoize(fn) {
    const cache = {}

    return function() {
        let key = JSON.stringify(arguments)
        
        if (cache[key]) {
            return cache[key]
        }
        cache[key] = fn.apply(fn, arguments)
        return cache[key]
    }
}
let getAreaWithMemoryMemo = memoize(getArea)
console.log(getAreaWithMemoryMemo(10))
console.log(getAreaWithMemoryMemo(10))
console.log(getAreaWithMemoryMemo(10))



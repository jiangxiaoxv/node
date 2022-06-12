const _ = require('loadsh')
/* function checkAge(age) {
    let min = 18
    return age >= min
}

function checkAgeS(min, age) {
    return age >= min
}

function checkAgeT(min) {
    return function(age) {
        return age >= min
    }
}



let checkAge = (min) => {
    return (age) => {
        return age >= min
    }
}
 */

/*
function getSum(a, b, c) {
    return a + b + c
}

const curried = _.curry(getSum)
console.log(curried(1)(2)(3)) */

// 柯里化案例
// ''.match(/\s+/g)
// ''.match(/\d+/g)



const match = _.curry(function (reg, str) {
    return str.match(reg)
})

const havaSpace = match(/(\s+)/g)
const haveNumber = match(/\d+/g)

const filter = _.curry(function(func, array) {
    return array.filter(func)
})

// console.log(havaSpace('hello world ha'))
// console.log(haveNumber('hello 123'))
// console.log(filter(havaSpace, ['j c', 'hl']))

// const findSpace = filter(havaSpace)
// console.log(findSpace(['j c', 'hl']))

function curry(func) {
    
    return function curriedFn(...args) {
        // 判断实参和形参的个数
        if (args.length < func.length) {
            return function() {
                return curriedFn(...args.concat([...arguments]))
            }
        }
        return func(...args)
    }
}
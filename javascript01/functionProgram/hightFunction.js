
// 函数作为参数
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn && fn(array[i], i, array)
    }
}

function filter(array, fn) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        let flag = fn && fn(array[i], i, array)
        if (flag) {
            result.push(array[i])
        }
    }
    return result
}

function map(array, fn) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        let item = fn(array[i], i, array)
        result.push(item)
    }
    return result
}

function every(array, fn) {
    for (let i = 0; i < array.length; i++) {
        let flag =  fn && fn(i, array[i], array)
        if (!flag) {
            return false
        }
    }
    return true
}

function some(array, fn) {
    for (let i = 0; i < array.length; i++) {
        let flag = fn && fn(i, array[i], array)
        if (flag) {
            return true
        }
    }
    return false
}



// 函数作为返回值

function makefn() {
    let msg = 'hello function'
    return function() {
        console.log(msg)
    }
}

function once(fn) {
    let done = false
    return function() {
        if (!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}



/* // 内存管理
// 申请
let obj = {} // 是从根上可以被找到的

// 使用
obj.name = 'jxx'

// 释放
// obj = null

let ali = obj // 可达对象

obj = null */

function objGroup (obj1, obj2) {
    obj1.next = obj2
    obj2.prev = obj1

    return {
        o1: obj1,
        o2: obj2
    }
}

let obj = objGroup({name: 'obj1'}, {name: 'obj2'})
console.log(obj)






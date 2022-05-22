// console.log(global)
console.log(__filename)
console.log(__dirname)
console.log(this == global)

;(function() {
    // nodejs下的模块实现
    console.log(this == global) // true 
})()
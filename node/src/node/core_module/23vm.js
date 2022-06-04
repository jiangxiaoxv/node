
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const path1 = path.join(__dirname, '../json/vm.txt')
let content = fs.readFileSync(path1, 'utf-8')
// let name = 'lqq'
// vm.runInThisContext(content)
age = 23
vm.runInThisContext('age += 10') // 不能使用局部变量，可以使用全局变量
console.log(age)




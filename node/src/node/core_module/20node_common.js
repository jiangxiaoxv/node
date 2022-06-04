
let obj = require('../module/commonjs')

module.exports = obj
// console.log(obj)
// console.log(module)
console.log(module == require.main) // true


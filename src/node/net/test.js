
const MyTransformCode = require('./08myTransform')

let ts = new MyTransformCode()

let str1 = '拉勾教育'

// console.log(Buffer.from(str1))

// console.log(ts.encode(str1, 1))

let encodeBuf = ts.encode(str1, 1)

// let a = ts.decode(encodeBuf)
// console.log(a)

let len = ts.getPackageLen(encodeBuf)
console.log(len)
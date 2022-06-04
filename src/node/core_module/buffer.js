// Buffer让JavaScript可以操作二进制
/* const b1 = Buffer.alloc(10) // 16进制数据的表示
const b2 = Buffer.allocUnsafe(10) // 在内存中，有一个空闲的空间，就会被拿过来使用，带着一些垃圾数据
const b3 = Buffer.from('jxx') // 16进制数据的表示
const b4 = Buffer.from('jxx', 'utf-8') // 16进制数据的表示
const b5 = Buffer.from('1', 'utf-8') // 16进制数据的表示
const b6 = Buffer.from([1, 2, 3]) // 16进制数据的表示
const b7 = Buffer.from(['1', 2, 3, '中']) // 16进制数据的表示, 汉字是不能被识别的
const b8 = Buffer.alloc(3)
const b9 = Buffer.from(b8) // 创建了一个新的空间


console.log(b1)
console.log(b2)
console.log(b3)
console.log(b4)
console.log(b5)
console.log(b6)
console.log(b7)
console.log(b8)
console.log(b9)
console.log(b7.toString())

b8[0] = 1
console.log(b8)
console.log(b9) */


// let buf = Buffer.alloc(6)
// fill 
/* // buf.fill('123', 1, 3)
buf.fill(123)
console.log(buf)
console.log(buf.toString()) */

/* buf.write('123', 1, 5) // 不重复写入, 第二个参数表示写入的长度
console.log(buf) */

// toString
/* buf = Buffer.from('刘小琼')
console.log(buf)
console.log(buf.toString('utf-8', 3, 6)) // 小 */

// slice
/* buf = Buffer.from('刘小琼')
let b1 = buf.slice(3)
console.log(b1)
console.log(b1.toString()) */

/* buf = Buffer.from('我爱爱')
console.log(buf)
console.log(buf.indexOf('爱', 4)) */

/* let b1 = Buffer.alloc(6)
let b2 = Buffer.from('拉勾')

b2.copy(b1, 2, 3, 9)
console.log(b1.toString())
console.log(b2.toString()) */

/* let b1 = Buffer.from('拉勾')
let b2 = Buffer.from('教育')
// let b = Buffer.concat([b1, b2], 9) // 9是限制长度
let b = Buffer.concat([b1, b2]) // 9是限制长度

console.log(b.toString())
console.log(Buffer.isBuffer(b))
console.log(b.length) */

Buffer.prototype.split = function(sep) {
    let ret = []
    let start = 0
    let offset = 0

    while((offset = this.indexOf(sep, start)) !== -1) {
        const itemBuffer = this.slice(start, offset)
        ret.push(itemBuffer)
        start = offset + itemBuffer.length
    }
    ret.push(this.slice(start))
    return ret
}
let buf = Buffer.from('zcc吃馒头， 吃面条，我吃所有吃')
let bufArr = buf.split('吃')
console.log(bufArr)





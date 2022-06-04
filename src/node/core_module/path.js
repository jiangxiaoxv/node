
const path = require('path')
/**
 * 01 返回的就是接收路径当中的最后一部分
 * 02 接受字符串
 * 03 第二个参数表示扩展名，如果没有设置则返回完整的文件名带后缀
 * 04 第二个参数作为后缀是，如果没有在当前路径中被匹配到，那么就会忽略
 * 05 此处理目录路径的时候如果说，结尾处有路径分割符，则也会被忽略掉
 * 
 */
/* // 1 获取路径中的基础名称(文件名，不包好路径)
// 2 返回路径最后一个目录或者文件名
console.log(path.basename(__filename, '.js')) // path
console.log(path.basename('/a/b/c/')) // c */


// 2 获取路径目录名(路径)
/**
 * 01 返回路径中最后一个部分的上一层目录所在路径
 */
/* console.log(path.dirname(__dirname)) // .../src
console.log(path.dirname('/a/b/c/')) // /a/b */


// 3 获取路径的扩展名
/**
 * 01 返回path路径中相应的后缀名
 * 02 如果path路径当中存在多个点，它匹配的是最后一个点，到结尾的内容
 */
/* console.log(path.extname(__filename)) // .js
console.log(path.extname('/a/b')) // 空
console.log(path.extname('/a/b/index.html.js.css')) //.css
console.log(path.extname('/a/b/index.html.js.')) // . */


// 4 解析路径
/** 
 * 01 接收一个路径，返回一个对象，包含不同的信息
 * 02 root dir base ext name
 * 
*/
/* const obj1 = path.parse('/a/b/c/index.html')
const obj2 = path.parse('/a/b/c/')
const obj3 = path.parse('/a/b/c')
const obj4 = path.parse('./a/b/c')

console.log(obj1)
console.log(obj2)
console.log(obj3)
console.log(obj4) */

/* // 5 序列化路径
const obj1 = path.parse('/a/b/c/index.html')
const obj2 = path.parse('/a/b/c/')
const obj4 = path.parse('./a/b/c')

console.log(path.format(obj1))
console.log(path.format(obj2))
console.log(path.format(obj4)) */


// 6 判断当前路径是否为绝对路径
/* console.log(path.isAbsolute(__dirname))
console.log(path.isAbsolute(__filename))
console.log(path.isAbsolute('foo'))
console.log(path.isAbsolute('/foo'))
console.log(path.isAbsolute('./a/b/foo'))
console.log(path.isAbsolute('../a/b/foo')) */

// 7 拼接路径
/* console.log(path.join(__dirname, './a/b/index.html'))
console.log(path.join('a/b', 'c', '../', 'index.html'))
console.log(path.join('a/b', 'c', './', 'index.html'))
console.log(path.join('a/b', 'c', './', '','index.html'))
console.log(path.join('')) // . 代表当前工作目录 */


// 8 规范化路径
/* console.log(path.normalize('a/b////c/d', '../', './index.html')) // a/b/c/d
console.log(path.normalize('')) // .
console.log(path.normalize('a/b\\/c')) // . */


// 9 绝对路径
/**
 * resolve([from], to)
 * 
 */
// console.log(path.resolve()) // 当前目录的绝对路径
/* console.log(path.resolve('a', 'b')) // __dirname/a/b
console.log(path.resolve('a', './b')) // a/b
console.log(path.resolve('a', '/b'))  // /b
console.log(path.resolve('/a', '/b')) // /b
console.log(path.resolve('/a', 'b')) // a/b
console.log(path.resolve('/a', '../b')) // a/b */
console.log(path.resolve('index.html'))



























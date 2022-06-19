# ECMAScript
1. 只提供了最基本的语法
2. JavaScript是它的一个扩展
3. es2015称之为es6，以后以年作为版本
4. es6 泛指是 es2015+

# string api
1. console.log(message.includes('foo'))
2. console.log(message.startsWith('Error'))
3. console.log(message.endsWith('.'))


# 箭头函数
1. 不会改变this指向

# Object方法
1. assign
2. is 判断两个值是否相等


# Proxy

# for of / for in
# some / every


# Iterable
1. 实现 for of 需要实现 Iterable接口

# generator


# ECMAScript 2016
1. array.includes('foo')
   array.include(NaN)
2. Math.pow(2, 10)
   2 ** 10

# ECMAScript 2017
1. Object.values(obj)
2. Object.entries(obj)
3. new Map(Object.entries(obj))
4. Object.getOwnPropertyDescriptors(obj)
5. Object.assign() 不能复制getter，setter
6. Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj)) // 能复制getter
7. const books = {html: 5, css: 16} for(let name in books) {name.padEnd(16, '-')}
8. function foo(bar, baz,) {}  // 尾逗号
9. Async/Await




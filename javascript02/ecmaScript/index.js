
const obj = {
    name: 'jxx', 
    age: 18,
    [Math.random]: 1
}
/* const {name} = obj // 对象的结构
const {age: objAge} = obj // 重命名
const {ages: objAgeDefa = '28'} = obj // 重命名, 给予默认值 */
/* console.log(name)
console.log(objAge)
console.log(objAgeDefa) */

// const str = console.log`hello world`

const name1 = 'tom'
const gender = true
function myTagFunc(stings, name, gender) {
    console.log(stings, name, gender)
    return 'jxx lucky'
}
/* const result = myTagFunc`hey, ${name} is a ${gender}`
console.log(result) */

const message = 'Error: foo is not defined.'
/* 
console.log(message.startsWith('Error'))
console.log(message.endsWith('.'))
console.log(message.includes('foo'))
console.log(obj) */
var name = 'window'
const person = {
    name: 'jxx',
    sayHi: function() {
        return () => {
            console.log(`hi, my name is ${this.name}`)
        }
    },
    syaHij: () => {
        console.log(`hi, my name is ${this.name}`)
    }
}
person.sayHi()()
person.syaHij.call(person)

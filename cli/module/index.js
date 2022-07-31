
let name = 'jack'
let age = 18

export {name, age}

setTimeout(() => {
    name = 'ben'
}, 1000)

if (name) {
    // import {name} from './module.js' 错误的语法
}
import('./module.js').then()

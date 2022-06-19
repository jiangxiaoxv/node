
const person = {
    name: 'jxx',
    age: 20
}

const personProxy = new Proxy(person, {
    deleteProperty(target, propery) {
        // console.log('delte', propery)
        delete target[propery]
    },
    get(target, propery) {
        return propery in target ? target[propery] : 'default'
    },
    set(target, propery, value) {
        if (propery === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError(`${value} is not integer`)
            }
        }
        target[propery] = value
    }
})
/* console.log(personProxy.name)
console.log(personProxy.sex)
personProxy.age = 10
console.log(person) */
// delete personProxy.age
// console.log(person)

const list = []
const listProxy = new Proxy(list, {
    set(target, property, value) {
        // console.log('set', property, value)
        target[property] = value
        return true // 表示设置成功
    }
})
// listProxy.push(1)
// console.log(list)

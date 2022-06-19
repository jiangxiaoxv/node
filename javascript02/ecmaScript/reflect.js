
const obj = {
    foo: '123',
    bar: '456'
}

const proxy = new Proxy(obj, {
    get(target, property) {
        return Reflect.get(target, property)
    }
})


// console.log(proxy.foo)
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
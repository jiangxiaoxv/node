
const obj = {

}
obj[true] = 'value'
obj[123] = 'value'

obj[{a: 1}] = 'value'
obj[{a: 2}] = 'value'

// console.log(Object.keys(obj))
// console.log(obj)

const m = new Map()
const tom = {name: 'tom'}

m.set(tom, 90)
// console.log(m)
// console.log(m.get(tom))
// console.log(m.has(tom))
// console.log(m.delete(tom))
// m.clear()

m.forEach((value, key) => {
    console.log(value, key)
})

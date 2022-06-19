
const set = new Set(['foo', 'bar'])

const iterator = set[Symbol.iterator]()
// console.log(iterator.next())

/* const obj = {
    store: ['foo', 'bar', 'bar'],
    index: 1,
    [Symbol.iterator] () {
        let index = 0;
        const self = this
        return {
            next: function() {
                
                const result =  {
                    value: self.store[index],
                    done: index >= self.store.length
                }
                index++
                return result
            }
        }
    }
} */
/* const obj = {
    store: ['foo', 'bar', 'bar'],
    index: 1,
    name: 'jxx',
    [Symbol.iterator] () {
        let index = 0;
        const self = this
        const keys = Object.keys(obj)
        // const keys = Reflect.ownKeys(obj)
        return {
            next: function() {
                
                const result =  {
                    value: self[keys[index]],
                    done: index >= keys.length
                }
                index++
                return result
            }
        }
    }
} */
const obj = {
    store: ['foo', 'bar', 'bar'],
    index: 1,
    name: 'jxx',
    [Symbol.iterator] () {
        
        function * generator() {
            for (let key in obj) {
                yield obj[key]
            }
        }
        return generator()
    }
}
for (let item of obj) {
    console.log(item)
}
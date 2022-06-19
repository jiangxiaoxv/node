
const s = new Set()
s.add(1)
s.clear()
s.has(1)

const arr = [1,2,1]
let result = Array.from(new Set(arr))
result = [...new Set(arr)]
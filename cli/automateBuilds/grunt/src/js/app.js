
const p = new Promise((res, rej) => {
    setTimeout(() => {
        res(1)
    }, 1000);
})
p.then((val) => {
    console.log(val)
    console.log('jxx')
})


/* setTimeout(() => {
    queueMicrotask(() => {
        console.log(3)
    })
    console.log(2)
}, 1000) */

/* async function t1() {
    let a = await 'jxx'
    console.log(a)
}
t1() */

async function t1() {
    let a = await new Promise((resolve) => {})
    console.log(a)
}
t1()


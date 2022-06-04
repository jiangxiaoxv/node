
// 以下两个执行顺序会有变化

setTimeout(() => {
    console.log('timeout')
}, 0)// 默认0, 宏任务添加任务队列延迟
setImmediate(() => {
    console.log('immediate')
})



# 事件循环
1. 每个代理都是由事件循环驱动的，事件循环负责收集事件（包括用户事件以及其他
   非用户事件等）、对任务进行排队以便在合适的时候执行回调。然后它执行所有处于等待中
   的JavaScript任务，然后是微任务，然后再开始下一次循环之前执行
   一些必要的渲染和绘制操作
    
2. queueMicrotask(() => {}) 开启一个微任务回调

# 产生微任务
1. promise
2. queueMicrotask()
3. MutationObserver 监听dom变化
4. 原因：
   - 减少dom操作用户感知到的延迟
   - 确保任务顺序的 一致性，即便当结果或者数据是同步可用的
   - 批量操作的优化

# 面试题
async function t1() {
    let a = await 'jxx' // await 后的代码是宏任务
    console.log(a) // await之后的代码是微任务
}
t1()

async function t1() {
    let a = await new Promise((resolve) => {}) 
    console.log(a) // await 之后的代码，是 await返回的promise.then()的执行，所以此时改行代码不会被执行
}
t1()


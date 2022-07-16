
/**
 * 01 假设当前在5ms的时间点上执行了一次proxy，
 *    我们就可以用这个时间剪去上次执行的时间（0），
 *    此时就会有一个时间差
 * 02 前置条件： 我们自己定义了一个wait，500
 * 
 * 03 wait - (now - previous)
 * 
 * 04 此时如果上述的计算结果大于0的，就意味着当前次的操作是一个高频触发，
 *    我们想办法让它不要去执行handle，如果这个结果小于等于0，这就意味着当前次
 *    不是一个高频触发，那么我们就可以直接执行handle
 * 05 此时我们就可以在500ms内想办法让所有的高频操作在
 *    将来都有一次执行就够了，不需要给每个高频操作都添加一个定时器
 * 
 */


// 就是控制执行的频率，比如控制300ms执行一次
function myThrottle(handle, wait) {

    if (typeof handle !== 'function') {
        throw new Error('handle must be a function')
    }

    if (wait == undefined) {
        wait = 400
    }

    let previous = 0 // 定义变量记录上一次执行的时间
    let timer = null // 来管理定时器

    return function proxy() {
        let now = new Date() // 定义变量记录当前次执行的时刻时间点
        const self = this
        let interval = wait - (now - previous)
        
        if (interval <= 0) {
            // 此时说明是一个非高频次操作，可以执行handle
            timer && clearTimeout(timer)
            timer = null;
            handle.call(self, ...arguments)
            previous = new Date()

        } else if (!timer) {
            // 当我们发现当前系统有一个定时器了，就意味着我们不需要
            // 再开启定时器
            // 此时就说明这次的操作发生在了我们定义的频次时间范围内
            // 就不应该执行handle
            // 这个时候我们就可以定义一个定时器，让我们handle
            // 在interval之后去执行
            // timer && clearTimeout(timer)
            timer = setTimeout(() => {
                clearTimeout(timer) // 这个操作只是将系统中的定时器清楚了
                                    // 但是timer中的值还在
                timer = null;
                handle.call(self, ...arguments)
                previous = new Date()
            }, interval)
        }

    }
}
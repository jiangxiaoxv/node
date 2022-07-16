// 防抖节流

/**
 * 为什么需要防抖与节流：
 *   在一些高频率事件触发的场景下，我们不希望对应的事件处理函数多次执行
 * 场景：滚动、输入请求、轮播图、点击操作
 * 浏览器默认情况下都会有自己的监听事件间隔（4-6ms）如果监测到多次的事件监听，那么就
 * 会造成不必要的资源浪费
 * 
 * 前置的场景：界面上有一个按钮，我们可以连续多次点击
 * 防抖：对于这个高频率的操作来说，我们只希望识别一次点击，可以人为是
 *      第一次或者最后一次
 * 
 * 节流：对于高频率操作，我们可以按自己来设置频率，让本来会
 *      执行多次的事件触发，按着我们定义的频率减少触发的次数
 * 
 * 
 */

// 有bug
function myDebounce(handle, wait = 300, immediate = false) {
    if (typeof handle !== 'function') {
        throw new Error('handle must be a function')
    }
    if (typeof wait === 'boolean') {
        immediate = wait
        wait = 300
    }
    if (typeof immediate !== 'boolean') {
        immediate = false
    }
    
    let timer = null
    
    return function proxy() {
        const that = this
        if (immediate && !timer) {
            handle.call(that, ...arguments)
            
            timer = setTimeout(() => {
                timer = null
            }, wait)
        } else {
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
                handle.call(that, ...arguments)
                timer = null
            }, wait)
        }
    }
}


// 完美防抖
function myDebounce02(handle, wait = 300, immediate = false) {
    if (typeof handle !== 'function') {
        throw new Error('handle must be a function')
    }
    if (typeof wait === 'boolean') {
        immediate = wait
        wait = 300
    }
    if (typeof immediate !== 'boolean') {
        immediate = false
    }
    
    let timer = null
    
    return function proxy() {
        const self = this
        const init = immediate && !timer
        
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            !immediate ? handle.call(self, ...arguments) : null
        }, wait)

        init ? handle.call(self, ...arguments): null
    }
}
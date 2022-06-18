
# 采用单线程模式工作的原因
1. dom操作决定了JavaScript是单线程
2. JS执行环境中负责执行代码的线程只有一个

# 同步模式
1. 排队执行
2. 调用栈

# 异步执行模式
1. 消息队列
2. 事件循环

# 回调函数
1. 所有异步编程方案的根基

# Promise
1. promise对象的then方法会返回一个全新的Promise对象
2. 后面的then方法就是为上一个then返回的promise注册回调
3. 前面then方法中回调函数的返回值会作为后面then方法回调的参数
4. 如果回调中返回的是promise， 那后面then方法的回调会等待他的结束

5. window.addEventListener('unhandlerejection', event => {
    const {reason, promise} = event
    // reason =》promise失败的原因，一般是一个错误对象
    // promise =》出现异常的promise对象
    event.preventDefault()
}, false)

6. process.addEventListener('unhandledRejection', (reason, promise) => {

    // reason =》promise失败的原因，一般是一个错误对象
    // promise =》出现异常的promise对象
    
}, false)


# Generator




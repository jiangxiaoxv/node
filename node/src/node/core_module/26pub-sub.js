
class PubSub {

    constructor() {
        this._events = {}

    }
    // 注册操作
    subscribe(event, callback) {
        if (this._events[event]) {
            // 如果当前 event 存在，所以我们只需要往后添加当前次坚监听操作
            this._events[event].push(callback)
        } else {
            // 之前没有订阅过此事件
            this._events[event] = [callback]
        }
    }

    // 发布
    publish(event, ...args) {
        const items = this._events[event]
        if (Array.isArray(items)) {
            items.forEach(function(callback) {
                callback.call(this, ...args)
            })
        }
    }
}

let ps = new PubSub()
ps.subscribe('jxx', () => {
    console.log('jxx')
})
ps.subscribe('lqq', () => {
    console.log('lqq')
})
ps.publish('jxx')
ps.publish('jxx')

// ps.publish('lqq')


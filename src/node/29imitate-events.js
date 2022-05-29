
class MyEvent {

    constructor() {
        this._events = Object.create(null)
        this._eventsCount = 0
    }

    on (type, callback) {
        // 判断当前时间是否已经存在，然后再决定如何做缓存
        if (this._events[type]) {
            this._events[type].push(callback)
        } else {
            this._events[type] = [callback]
            this._eventsCount++
        }
    }

    once (type, callback) {
        // 判断当前时间是否已经存在，然后再决定如何做缓存
        
        const foo = (...args) => {
           callback.call(this, ...args)
           this.off(type, foo)
        }
        foo.link = callback
        this.on(type, foo)
    }

    emit(type, ...args) {
        
        if (this._events && Array.isArray(this._events[type])) {
            this._events[type].forEach((callback) => {
                callback.call(this, ...args)
            })
        }
    }

    off(type, callback) {
        // 判断当前type 时间监听是否存在, 如果存在则取消指定的监听
        
        if (this._events && this._events[type]) {
            if (!callback) {
                this._events[type] = []
            }
            this._events[type] = this._events[type].filter(item => {
                return item !== callback && item.link !== callback
                // return item !== callback

            })
        }
    }
}

let ev = new MyEvent()
let fn = (...data) => {
    console.log('时间', data)
}

// ev.on('j', fn)
// ev.emit('j', 1, 2)

// ev.off('j', fn)
// ev.emit('j', 1, 2)
ev.once('j', fn)
ev.off('j', fn)
// ev.emit('j', 1)
ev.emit('j', 2)

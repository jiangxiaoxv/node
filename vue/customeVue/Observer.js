import Dep from './dep'

export default class Observer {
    constructor(data) {
        if (data && typeof data == 'function') {
            data = data()
        }
        this.walk(data)
    }

    walk(data) {
        // 1. 判断data是否是对象
        if (data == null || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    defineReactive(obj, key, val) {
        const that = this

        // 负责收集依赖，并发送通知
        let dep = new Dep()
        this.walk(val)

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newValue) {
                if (newValue === val) {
                    return
                }
                obj[key] = newValue
                that.walk(newValue)
                // 发送通知
                dep.notify()
            },
        })
    }
}

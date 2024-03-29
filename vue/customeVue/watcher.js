import Dep from './dep'

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        // data 中的属性名称
        this.key = key
        // 回调函数负责更新视图
        this.cb = cb

        // 把wather对象记录到Dep类的静态属性target
        Dep.target = this
        this.oldValue = vm[key] // 就会触发get操作
        Dep.target = null
    }
    // 当数据发生变化的时候更新视图
    update() {
        let newValue = this.vm[this.key]
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }
}

export default Watcher

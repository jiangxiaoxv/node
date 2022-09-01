import Observer from './Observer.js'
import Compiler from './compiler.js'

class Vue {
    constructor(options) {
        // 1. 保存属性
        this.$options = options || {}
        this.$data = options.data || []
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 2. 把data中的成员给vm实例绑定起来
        this._proxyData(this.$data)
        // 3. 数据响应式
        new Observer(this.$data)
        // 4. 调用compiler对象，解析指令和插值表达式
        new Compiler(this)
    }

    _proxyData(data) {
        // 遍历data中的所有属性、
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                },
            })
        })
    }
}

const vm = new Vue({
    el: '#app',
    data: function () {
        return {
            msg: 'hllo vue',
            count: 100,
            person: { name: 'zs' },
        }
    },
})

vm.msg = 'jxx'

console.log(vm)

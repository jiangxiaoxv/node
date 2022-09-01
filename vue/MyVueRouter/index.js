let _Vue = null
export default class VueRouter {
    static install(Vue) {
        /**
         * 1. 判断当前插件是否已经被安装
         * 2. 把Vue构造函数记录到全觉变量
         * 3. 把创建Vue实例传入的router对象注入到Vue实例上
         */
        //1. 判断当前插件是否已经被安装
        if (VueRouter.install.installed) {
            return
        }

        VueRouter.install.installed = true
        // 2. 把Vue构造函数记录到全觉变量
        _Vue = Vue

        // 把创建Vue实例传入的router对象注入到Vue实例上
        // 混入
        _Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    // Vue实例才要绑定，vue组建不执行
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            },
        })
    }

    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/',
        })
    }

    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }

    // 遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routeMap中
    createRouteMap() {
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }

    initComponents(Vue) {
        const self = this
        Vue.component('router-link', {
            props: {
                to: String,
            },
            render(h) {
                return h(
                    'a',
                    {
                        attrs: {
                            href: this.to,
                        },
                        on: {
                            click: this.clickHandler,
                        },
                    },
                    [this.$slots.default] // 字元素
                )
            },
            methods: {
                clickHandler(e) {
                    history.pushState({}, '', this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                },
            },
        })

        Vue.component('router-view', {
            props: {
                to: String,
            },
            render(h) {
                const component = self.routeMap[self.data.current]
                return h(component)
            },
        })
    }

    initEvent() {
        window.addEventListener('popstate', () => {
            this.data.current = window.location.pathname
        })
    }
}

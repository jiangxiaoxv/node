
# 什么是虚拟dom，以及虚拟dom的作用
1. VDom就是由普通的js对象来描述DOM对象
2. 真实DOM的成员属性很多
3. 虚拟dom只有 sel,data,children,text,elm,key 等属性成员
4. 创建真实dom的开销要比虚拟dom打的多

# 为什么要使用虚拟dom
1. 模版引擎可以简化视图操作，没办法跟踪状态
2. 虚拟dom跟踪状态变化，

# Snabbdom的基本使用
1. npm i parcel-bundler -D // 打包工具
2. npm i snabbdom@2.1.0

# Snabbdom 模块
1. Snabbdom的核心库并不能处理DOM元素的属性/样式/事件等，
   可以通过注册Snabbdom默认提供的模块来实现
2. snabbdom中的模块可以用来扩展Snabbdom的功能
3. Snabbdom中的模块的实现是通过注册全局的钩子函数来实现的
4. 官方提供了6个模块
   - attributes
   - props
   - dataset
   - class
   - style
   - eventlisteners
5. 模块使用步骤
   - 导入需要的模块
   - init() 中注册模块
   - h() 函数的第二个参数处使用模块

# Snabbdom的源码解析
1. init()设置模块，创建patch() 函数
2. 使用h()函数创建Javascript对象（VNode）描述真实DOM
3. patch() 比较新旧两个Vnode
4. 把变化的内容更新到真实DOM树

# Snabbdom的源码
1. git clone -b v2.1.0 --depth=1
2. https://github.com/snabbdom/snabbdom.git

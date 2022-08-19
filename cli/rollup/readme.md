
# Rollup 更为小巧
1. 仅仅是一款ESM打包器，不支持hmr
2. 不是与webpack竞争
3. 提供一个充分利用ESM各项特性的高校打包器
4. 自动开启tree shaking

# Rollup
1. yarn rollup
2. yarn rollup ./src/index.js --format iife
3. yarn rollup ./src/index.js --format iife --file dist/bundle.js
4. yarn rollup --config rollup.config.js

# 加载其他资源的
1. 支持插件扩展的方式，时rollup唯一扩展途径
2. yarn add rollup-plugin-json -D

# Rollup 加载npm模块
1. rollup-plugin-node-resolve
2. rollup 默认只能处理esm

# Rollup 处理commonjs
1. yarn add rollup-plugin-commonjs -D

# Rollup code Splitting
1. 动态导入
2. 自动处理分包
3. import('./logger').then(({log}) => {
    log('code splitting-')
})
4. yarn rollup --config --form amd

# Rollup
1. 多入口打包

# Rollup 与webpack
优点
1. 输出结果更加扁平
2. 自动移除未引用代码
3. 打包结果依然完全可读
缺点
4. 加载非ESM的第三方模块比较复杂
5. 模块最终都被打包到一个函数中，无法实现hmr
6. 在浏览器环境中，代码拆分功能依赖AMD库（require.js）
总结
如果我们正在开发应用程序，需要hmr，大应用，分包都不能使用rollup，优先使用webpack
如果我们正在开发一个框架或着类库选择rollup
webpack大而全，rollup小而美


# Parcel
1. 零配置的前端应用打包器
2. yarn init -y
3. yarn add parcel-bundler -D
4. mkdir src
5. src/index.html <srcipt src="./main.js">
6. cat src/foo.js export default {name: 'jxx'}
7. yarn parcel src/index.html 
8. 自动安装依赖(不需要安装loader，插件，jquery直接使用)
9. import $ from 'jquery'
10. import './style.css'
11. 支持动态导入 import('jquery').then(($) => {})
12. yarn parcel build src/index.html 以生产模式打包
13. 多进程打包,构建速度快


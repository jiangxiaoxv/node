
# 模块化的演进过程
1. 文件划分方式（命名冲突、污染全局作用域、无法管理模块的依赖关系）
2. 命名空间 挂载一个对象上（全局对象），没有私有空间，东西容易被修改
3. IIFE提供私有空间（立即执行函数）依赖注入

# 模块化规范的出现
1. script 引入
2. CommonJs 规范
    - 一个文件就是一个模块
    - 每个模块都有单独的作用域
    - 通过module.exports 导出成员
    - 通过require函数载入模块
    - 浏览器端需要编译
    - Commonjs是以同步模块加载模块，启动时加载；

3. AMD Require.js
    - define('name', ['依赖'], function('依赖') {
        return {

        }
    })
    - 模块加载器 require(['模块'], function() {})
    - 使用起来比较复杂（操作模块）
    - 模块js文件请求频繁

4. Sea.js + CMD
     - define()
     - require()


# ECMAScript esmodule
1. import
2. export default 
3. <script type="module">
        export const a = 1;
   </script>
4. esm 自动采用严格模式
   - 不能直接使用this -》 undefined
   - 每个esmodule 都是运行在单独的私有作用域内
   - esmodule 中是通过cors的方式请求外部js模块的
   - 是以server方式执行的
   - esm 的script 标签会延迟执行脚本 defer
   - 导出的是引用, 模块内部修改的值会同步外部的值
   - 暴漏出的成员是只读的，并不能修改

5. import
   - 使用完整的路径，不能省略扩展名
   - 可以使用http 的url
   - import {} from './index.js' 只是执行
   - import './module.js' 只加载不执行
   - import 只能出现在最顶层，不能使用if条件里面写import
   - import('./module.js').then() 动态加载模块
   - import {name, default as titel} from './index.js

6. 兼容性问题
   - 不同浏览器兼容不一样，可以通过esmodule loader去处理
   - <script nomodule></script>

7. node环境使用mjs 扩展名
   - node --experimental-modules index.mjs
   - Es modules中可以导入Commonjs模块
   - CommonJS中不能导入Esmodules模块
   - Commonjs始终只会导出一个默认成员
   - 注意import不是解构导出对象

8. commonjs与esmodule的差异
   - esmodule  import.meta.url

9. node 引入esmodule
   - package.json中 {type: 'module'}
     这样的话，就不用mjs扩展名

10. Babel
   - yarn add @babel/node @babl/core @babel/preset-env -D
   - yarn babel-node
   - yarn babel-node index.js --presets=@babel/preset-env
   - 可以建立 .babelrc 文件
     {
        "presets": ['@babel/preset-env'] // 一个插件的集合
        "plugins": [
            "@babel/plugin-transform-modules-commonjs"
        ]
     }
     // 如果不使用'@babel/preset-env'集合，就要使用单独的插件
     // @babel/plugin-transform-modules-commonjs



# node特点（单线程）
1. 异步IO
2. 事件驱动
3. 事件循环

# 单线程高性能（IO密集型任务）
1. 非阻塞的异步io，作为中间层 实现高并发，提高吞吐量
2. 实时的聊天应用
3. 不适合处理大量的业务逻辑

# Nodejs实现API服务
1. typescript 初始化tsc --init
2. npm i ts-node -D 解析ts在node中
3. npm i @types/express -D

# 全局对象
1. Global的根本作用就是作为宿主
2. __filename: 返回正在执行脚本文件的绝对路径
3. __dirname: 返回正在执行脚本所在目录
4. timer类函数：执行顺序与事件循环间的关系
5. process: 提供与当前进程互动的接口
6. require、module、exports
7. 默认this是空对象，和global并不是一样的 this == global // false

# process
git push -u origin --all

# path
1. basename() path.basename(__filename, 'js') = path
2. dirname()
3. extname()
4. isAbsolute()
5. join()
6. resolve() 返回一个绝对路径
7. parse() 解析路径
8. format() 序列化路径
10. normalize() 规范化路径

# Buffer
1. 二进制数据
2. 流操作
3. buffer

# buffer特点
1. 无需require的一个全局变量
2. 实现nodejs平台下的二进制数据操作
3. 不占据v8堆内存大小的内存空间
4. 内存的使用由node来控制，由v8的gc回收
5. 一般配合stream流使用，充当数据缓冲区

# 创建Buffer
1. Buffer是nodejs的内置类
2. alloc 创建指定字节大小的buffer
3. allocUnsafe: 创建指定大小的buffer（不安全）
4. from： 接收数据，创建buffer

# Buffer 方法
1. fill: 使用数据填充buffer
2. write：向buffer中写入数据
3. toString： 从buffer中读取数据
4. slice
5. indexOf
6. copy

# Buffer 静态方法
1. concat： 将多个buffer拼接成一个新的buffer
2. isBuffer：判断当前数据是否为buffer

# Fs是内置核心模块，提供文件系统操作API
1. 权限位（用户对于文件所具备的操作权限）
2. flag (对文件操作方式)
    r: 可读
    w: 可写
    s: 同步
    +: 执行相反操作
    X: 表示排它操作
    a: 追加操作
3. fd就是操作系统分配给被打开文件的表示标识

# 文件读写与拷贝操作
1. readFile
2. writeFile
3. appendfile
4. copyFile
5. watchFile

# md 转html

# 文件打开与关闭
1. fs.open(path, 'r' ,(err, fd) => {})
2. fs.close(fd, err => {})

# 大文件的读取和写入
1. 文件a 《--buffer--》 文件b
2. fs.open fs.read fs.write
# 文件拷贝自定义实现

# Fs之目录操作
1. access: 判断文件或目录是否具有操作权限
2. stat: 获取目录及文件信息
3. mkdir: 创建目录
4. rmdir: 删除目录
5. readdir: 读取目录中内容
6. unlink: 删除指定文件 


# 递归删除目录

# 模块化
1. Commonjs
2. AMD 规范 require.js
3. CMD 规范 Sea.js
4. Es modules 规范

# Commonjs
1. 是语言层面上的规范

2. 模块引用
3. 模块定义
4. 模块标识

5. 任意一个文件就是一个模块，具有独立的作用域
6. 使用require导入其他模块
7. 将模块id传入require实现目标模块定位

module属性
1. 任意js文件就是一个模块，可以直接使用module属性
2. id： 返回模块标识符，一般是一个绝对路径
3. filename： 返回文件模块的绝对路径
4. loaded：返回boolean，表示模块是否完成加载
5. parent：返回对象存放调用当前模块的模块
6. children：返回数组，存放当前模块调用的其他模块
7. exports：返回当前模块需要暴露的内容
8. paths：返回数组，存放不同目录下的node_modules位置

module 与 module.exports 的区别
1. module.exports 与 exports 都指向同一块内存地址
2. 不能给exports 重新赋值，否则就切断了 exports 与
   module.exports的联系，就是指向不是同一个地址了，
   exports 就变成局部变量了

require 属性
1. 基本功能是读入并且执行一个模块文件
2. resolve：返回模块文件绝对路径
3. extensions：依据不同后缀名执行解析操作
4. main：返回主模块对象

Commonjs规范
1. 起初是为了弥补js语言模块化缺陷
2. commonjs是语言层面的规范，当前主要用于node.js
3. 规定模块化分为引入、定义、标识符三个部分
4. 在任意模块中可以直接使用包含模块信息
5. require接收标识符，加载目标模块
6. exports与module.exports都能到处模块数据
7. 定义模块的加载是同步完成


# 模块分类及加载流程
1. 核心模块： node源码编译时写入到二进制文件中
2. 文件模块： 代码运行时，动态加载

加载流程
1. 路径分析： 依据标识符确定模块位置
   路径标识符   
   非路径标识符 fs path url util

2. 文件定位： 确定目标模块中具体的文件及文件类型
   .js -> .json -> .node -> 目录包 -> package.json -> 使用JSON.parse()
   .main.js -> main.json -> main.node(main字段)
    将index作为目标模块中的具体文件名称（没有main字段）

3. 编译执行： 采用对应的方式完成文件的编译执行
   - 将某个具体类型的文件按照相应的方式进行编译和执行
   - 创建新对象，按照路径载入，完成编译执行
   - 缓存有限原则，提高模块加载速度，使用路径作为索引进行缓存

# 模块加载源码分析


# 内置模块之VM


# 模拟文件模块加载实现
1. 核心逻辑
   - 路径分析
   - 缓存优化
   - 文件定位
   - 编译执行


# 时间模块
1. 通过Eventemitter类实现事件统一管理






















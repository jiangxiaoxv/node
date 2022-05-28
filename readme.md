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













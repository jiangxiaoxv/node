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






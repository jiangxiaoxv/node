# Express
1. Express 的res， rep是继承原生对象的http响应和请求对象
   故express的res，rep能用原生res，rep的方法。

# 中间件分类
1. 应用程序级别中间件
2. 路由级别中间件
3. 错误处理中间件
4. 内置中间件
5. 第三方中间件


# 跳过其余中间件功能 
1. 要从路由器中间件堆栈中跳过其余中间件功能 ，请调用
   next('route') 将控制权传递给下一条路有
   - 注意： next('route')仅在使用app.METHOD()或
           router.METHOD()函数加载的中间函数有效


# 路由中间件

# 错误处理中间件


# 内置中间件
1. express.json()
2. express.urlencoded()
3. express.raw() 解析Content-type为application/octet-stream
4. express.text() text/plain
5. express.static() 托管静态资源文件


# 第三方中间件
1. 

# webpack 初体验
1. yarn init -y;  yarn add webpack webpack-cli -D  
2. yarn webpack --version
3. 目录下的src/index.js是打包入口
4. 我们通过 file-loader 或者 url-loader 已经可以将 JS 或者 CSS 中用到的图片打包到指定目录中了，但是 file-loader 或者 url-loader 并不能将 HTML 中用到的图片打包到指定目录中，所以此时我们就需要再借助一个名称叫做 "html-withimg-loader" 的加载器来实现 HTML 中图片的打包

# webpack5中配置file-loader打包后无法正常显示图片
1. 在 webpack5 中 css-loader 会对 url() 处理为require(),旧的assets loader与新的assets loader冲突
    {
        test: /\.(jpg|png|gif)$/,
        type: 'javascript/auto',
        use: {
            loader: 'file-loader',
            options: {
            name: 'img/[name].[ext]',
            esModule: false
            },
        
    }
2. webpack 5新处理方式，不实用file-loader
    {
        test: /\.(png|jpe?g|ico|gif)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'images/[name]_[contenthash:8][ext]'
        }
    },

# Data URLs
1. 当前url表示文件内容，不用发http请求
2. {
        test: /\.(png|jpe?g|ico|gif)$/i,
        type: 'asset', // asset和asset/resource的区别就是，后者只做拷贝，不能配置转base64。
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024 // 10kb一下采用base64的dataURl
            }
        },
        generator: {
            filename: 'images/[name]_[contenthash:8][ext]'
        }
    },
3. {
                test: /\.(jpg|png|gif)$/,
                type: 'javascript/auto',
                use: {
                  loader: 'file-loader',
                  options: {
                    name: 'img/[name].[ext]',
                    esModule: false
                  },
                },
            }
url-loader 不满足条件内部会调用file-loader处理，所以webpack
配置文件不需要单独再写一遍file-loader

# Loader分类
1. 编译转换类 css-loader
2. 文件操作类 url-loader
3. 代码检查类 eslint


# Babel
1. yarn add babel-loader @babel/core @babel/preset-env
2. webpack 只是打包工具，加载器可以用来编译转换代码

# Html-loader
1. html-withimg-loader、html-loader 只会处理html的img，a标签不会被处理
2. 
            {   
                test: /\.(html|html)$/,
                include: path.join(__dirname, 'src/html'),
                use: {
                    loader: 'html-loader',
                    options: {
                        // attrs: ['img:src', 'a:href'] webpack 4的语法
                        // esModule: false,
                        sources: {
                            list:[
                                "...",// 所有默认支持的标签和属性，这个一定要加上，不然就只会检测a标签了
                                {
                                    tag:"a",
                                    attribute: 'href',
                                    type: 'src'
                                }
                            ]
                        }
                    }
                }
            },

# 自己开发loader
1. 处理markDown
2. loader 是把源文件经过处理，返回标准的JavaScript代码，再传递给webpakc内部打包，
   所以自己写的loader返回的内容要是标准的JavaScript
3. 安装额外的markDown模块解析工具
   yarn add marked -D
4. 对marked处理后的html进行转化 
   html-loader 处理其html
   {
        test: /\.md$/,
        use: [
            {
                loader: 'html-loader',
            },
            {
                loader: resolve('./src/myLoader/markdown-loader.js'),
            },
        ]
    },

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = dir => path.resolve(__dirname, dir);
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin')
const MyPlugin = require('./src/myPlugins/index.js')

module.exports = {
    mode: 'none', // none production development
    entry: path.join(__dirname, './src/main.js'),
    devServer: {
        port: 3000,
        static: './dist', // 本地服务器所加载文件的目录
        compress: true,
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            '@config': resolve('config')
        },
    },
    target: 'web',
    output: {
        filename: '[name]_[contenthash:8].js',
        path: path.join(__dirname, './dist'),
        clean: true, // 每次打包的时候清空dist目录内容
        // assetModuleFilename: 'images/[name][ext]', // asset/resource
    },
    module: {
        rules: [
            /* {
                test: /\.md$/,
                type: "asset/resource",
                generator: {
                    filename: "html/[name]_[contenthash:8].html",
                },
            },
            {
                test: /\.md$/,
                use: [
                    
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    },
                    {
                        loader: resolve('./src/myLoader/markdown-loader.js'),
                    },
                ]
            }, */
            /* 
            {
                test: /\.(htm|html)$/, // 处理html中的img
                loader: 'html-withimg-loader'
            }, */
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
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            /* {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, */
            /* {
                test: /\.(jpg|png|gif)$/,
                type: 'javascript/auto',
                use: {
                  loader: 'url-loader',
                  options: {
                    esModule: false,
                    limit: 10 * 1024 // 10kb
                  },
                },
            } */
            /* {
                test: /\.(jpg|png|gif)$/,
                type: 'javascript/auto',
                use: {
                  loader: 'file-loader',
                  options: {
                    name: 'img/[name].[ext]',
                    esModule: false
                  },
                },
            } */
            {
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
            
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),  // 热更新插件
        // new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(),
        new MyPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/html/index.html'),
            inject: 'body', // 在body里面生成script
            title: '白嫖学习的',
            meta: {
                viewport: 'width=device-width'
            },
            templateParameters: {
                h1text: 'hello World'
            },
            filename: 'index.html',
        }),
        /* new HtmlWebpackPlugin({
            title: '多页面应用2',
            template: './src/html/index2.html',
            inject: 'body',
            filename: 'index2.html',
            publicPath: '/'
        }),
        new copyWebpackPlugin({
            patterns: [
              { from: "public", to: "public" },
            ],
        }), */
    ]
}
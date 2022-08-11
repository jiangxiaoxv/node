const HtmlWebpackPlugin = require('html-webpack-plugin');
// 该插件针对webpack5
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 需要配合mode: production
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');

// 查看打包依赖
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')


// pwa
const WorkboxPlugin = require('workbox-webpack-plugin')

// shimming
const webpack = require('webpack')

const toml = require('toml')
const yaml = require('yaml')
const json5 = require('json5')

const path = require('path')

module.exports = (env) => {
    return {
        // mode: env.production ? 'production': 'development',
        mode: 'development',
        entry: {
            // main: './src/app.ts'
            // index: './src/main.js', 
            // index2: './src/main2.js',
            // ap: './src/ap.js',
            // pwa: './src/pwa.js',
            // shimming: './src/shimming.js',
            polyfills: './src/polyfills.js',
            // dll: './src/dll.js'
        },
        // 告诉webpack，引入juqery使用script标签，而不是其他模块规范
        externalsType: 'script',
        externals: {
            // jquery: 'jQuery', 标识不需要webpack打包，但需要手动引入cdnjquery
            // 这样子写，webpack帮我们引入cdn，自己不需要写
            jquery: [
                'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js',
                '$'
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            },
            extensions: ['.ts', '.json', '.js', '.vue']
        },
        // devtool: 'eval',
        // devtool: false,
        // devtool: 'source-map',
        // devtool: 'hidden-source-map',
        // devtool: 'inline-source-map',
        // devtool: 'cheap-module-source-map',

        output: {
            filename: 'scripts/[name].[contenthash:6].js',
            path: path.resolve(__dirname, './dist'),
            clean: true, // 每次打包的时候清空dist目录内容
            assetModuleFilename: 'images/[name][ext]', // asset/resource
            // publicPath: '/',
            // publicPath: 'http://localhost:8080' // 所有资源的前缀
        },
        devServer: {
            static: path.resolve(__dirname, './dist'),
            compress: true,
            headers: {
                'X-Access-Token': 'abc123',
                'Cache-Control': 'no-store'
            },
            // host: '0.0.0.0', // 局域网所有的伙伴都可以访问
            proxy: {
                '/api': 'http://baidu.com',
                target: '',
            },
            hot: true, // 模块热替换
            liveReload: true, // 自动刷新浏览器
            client: {
                overlay: false, // 错误覆盖在浏览器上
            },
            // dev server 的pwa
            /* devMiddleware: {
                writeToDisk: true, // 写入到硬盘中
            } */
            // http2: true, // 自动加上https
            // historyApiFallback: true, // histroy不向后端请求
            // https: true
            // port: 3000
        },
        optimization: {
            minimizer: [
                new cssMinimizerWebpackPlugin(),
            ],
            // 第三种方式多入口，防止重复打包，需要配合插件语法
            splitChunks: {
                chunks: 'all', // 公共代码的抽离，多入口依赖同一个lodash,
                minSize: 15,
                cacheGroups: {
                    vendor: {
                       test:/[\\/]node_modules[\\/]/,// 文件目录
                       name: 'vendors',
                       chunks: 'all'
                    }
                 }
            },
            // 摇树优化
            usedExports: true
    
        },
        performance: {
            hints: false, // 只有生产环境控制台下面才有打包性能优化的信息
        },
        module: {
            rules: [
                /* {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }, */
                {
                    test: require.resolve('./src/shimming.js'),
                    use: 'imports-loader?wrapper=window'
                },
                {
                    test: require.resolve('./src/globals.js'),
                    use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse'
                },
                {
                    test: /\.ts/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                   [
                                       '@babel/preset-env',
                                        {
                                            targets: [
                                                'last 1 version',
                                                '> 1%'
                                            ],
                                            useBuiltIns: 'usage',
                                            corejs: 3
                                        }
                                   ]
                                ],
                                plugins: [
                                    [
                                        '@babel/plugin-transform-runtime'
                                    ]
                                ]
                            }
                        },
                        {
                            loader: 'thread-loader',
                            options: {
                                workers: 2
                            }
                        }
                        // 'eslint-loader'
                    ]
                },
                {
                    test: /\.(toml)$/,
                    type: 'json',
                    parser: {
                        parse: toml.parse
                    }
                },
                {
                    test: /\.(yaml)$/,
                    type: 'json',
                    parser: {
                        parse: yaml.parse
                    }
                },
                {
                    test: /\.(json5)$/,
                    type: 'json',
                    parser: {
                        parse: json5.parse
                    }
                },
                {
                    test: /\.(csv|tsv)$/,
                    use: 'csv-laoder'
                },
                {
                    test: /\.(xml)$/,
                    use: 'xml-laoder'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource'
                },
                {
                    test: /\.(less|css)$/,
                    use: [
                        miniCssExtractPlugin.loader, 
                        {
                            loader: 'css-loader',
                            /* // 把css文件，当作js文件模块
                            options: {
                                modules: true
                            } */
                        },
                        'postcss-loader',
                        'less-loader', 
                    ]
                },
                {
                    test: /\.png$/,
                    type: 'asset/resource',
                    // 这里的优先级高于outpu的assetModuleFilename: 'images/[name][ext]'
                    generator: {
                        filename: 'images/[name][ext]'
                    }
                },
                {
                    test: /\.svg$/,
                    type: 'asset/inline', // 资源的base64
                },
                {
                    test: /\.txt$/,
                    type: 'asset/source'
                },
                {
                    test: /\.jpg$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 // 4kb
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html',
                inject: 'body', // 在body里面生成script
            }),
            new miniCssExtractPlugin({
                filename: 'style/[name]_[contenthash:6].css'
            }),
           /*  // new BundleAnalyzerPlugin(),
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true, // 快速启用service wokr
                skipWaiting: true, // 不允许遗留久的server work
            }), */
            new webpack.ProvidePlugin({
                _: 'lodash'
            })
        ]
    }
}

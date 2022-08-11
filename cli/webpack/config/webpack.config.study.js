
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 该插件针对webpack5
const miniCssExtractPlugin = require('mini-css-extract-plugin')
// 需要配合mode: production
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
// 
const TerserWebpackPlugin = require('terser-webpack-plugin')


const toml = require('toml')
const yaml = require('yaml')
const json5 = require('json5')

const path = require('path')

module.exports = (env) => {
    // console.log(env, '>>>>>>>>>')
    return {
        mode: env.production ? 'production': 'development',
        // mode: 'production',
        entry: {
            // 第一种方式多入口，防止重复打包
            /* index: {
                import: './src/main.js',
                dependOn: 'shared'
            },
            another: {
                import: './src/js/useLodash.js',
                dependOn: 'shared'
            },
            shared: 'lodash' */
            // 第二种方式多入口，拆包，导致重复打包
            /* index: './src/main.js', // 多入口打包，使用了lodash
            another: './src/js/useLodash.js', // 多入口打包，使用lodash lodash 也会被打包到index的bundle中 */
           /*  // 第二种方式多入口，防止重复打包，需要配合插件语法,分包，防止重复打包
            index: './src/main.js', 
            another: './src/js/useLodash.js' */
            index: './src/main.js', 
        },
        devtool: 'source-map',
        output: {
            filename: 'scripts/[name].[contenthash:6].js',
            path: path.resolve(__dirname, './dist'),
            clean: true, // 每次打包的时候清空dist目录内容
            assetModuleFilename: 'images/[name][ext]', // asset/resource
            // publicPath: 'http://localhost:8080' // 所有资源的前缀
        },
        devServer: {
            static: './dist'
        },
        optimization: {
            minimizer: [
                new cssMinimizerWebpackPlugin(),
                new TerserWebpackPlugin(), // 只有生产环境才会有用
            ],
            // 第三种方式多入口，防止重复打包，需要配合插件语法
            splitChunks: {
                // chunks: 'all', // 公共代码的抽离，多入口依赖同一个lodash,
                cacheGroups: {
                    vendor: {
                       test:/[\\/]node_modules[\\/]/,// 文件目录
                       name: 'vendors',
                       chunks: 'all'
                    }
                 }
            },
            
    
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
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                [
                                    '@babel/plugin-transform-runtime'
                                ]
                            ]
                        }
                    }
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
                    use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader']
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
                // 现在webpack将按照默认条件，自动地在resource和inline之间进行选择
                // 小于8kb的文件，将视为inline模块类型，否则会被视为resource模块类型
                // 可以通过webpack配置的module rule层级中，设置
                // Rule.parser.dataUrlCondition.maxSize选项来改表此条件
                /* {
                    test: /\.jpg$/,
                    type: 'asset'
                }, */
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
            })
        ]
    }
}
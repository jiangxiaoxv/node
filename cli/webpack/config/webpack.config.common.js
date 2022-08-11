
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const toml = require('toml')
const yaml = require('yaml')
const json5 = require('json5')

const path = require('path')

module.exports = {
    
    entry: {
        index: './src/main.js',
        another: './src/js/useLodash.js'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        clean: true, // 每次打包的时候清空dist目录内容
        assetModuleFilename: 'images/[name][ext]', // asset/resource
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                   test:/[\\/]node_modules[\\/]/,// 文件目录
                   name: 'vendors',
                   chunks: 'all'
                }
             }
        },
        
    },
    module: {
        rules: [
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
        })
    ]
}
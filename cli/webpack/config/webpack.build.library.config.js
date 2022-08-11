
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: {
        mylib: './src/library.js'
    },
    /* experiments: {
        outputModule: true,
    }, */
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        clean: true, // 每次打包的时候清空dist目录内容
        library: {
            name: 'mylib_test',
            type: 'umd'
        },
        globalObject: 'globalThis',
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_' // 全局引入
        }
    }

}
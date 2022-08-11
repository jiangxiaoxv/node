
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: {
        dll: './src/dll.js'
    },
    
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        clean: true, // 每次打包的时候清空dist目录内容
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body', // 在body里面生成script
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, './dll/manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, './dll/jquery.js'),
            publicPath: './'
        })
    ]

}
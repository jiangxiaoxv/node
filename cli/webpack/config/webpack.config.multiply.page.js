
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'development',
    // entry: './src/app.js',
    entry: {
        // main: ['./src/app.js', './src/app2.js'],
        lodash: {
            import: 'lodash',
            filename: 'common/[name].js'
        },
        main: {
            import: ['./src/app.js', './src/app2.js'],
            dependOn: 'lodash',
            filename: 'chanel1/[name].js'
        },
        main2: {
            import: './src/app3.js',
            dependOn: 'lodash',
            filename: 'chanel2/[name].js'
        }
        
    },
    output: {
        filename: 'scripts/[name].[contenthash:6].js',
        path: path.resolve(__dirname, './dist'),
        clean: true, // 每次打包的时候清空dist目录内容
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '多页面应用1',
            template: './public/index.html',
            inject: 'body',
            chunks: ['main', 'lodash'],
            filename: 'chanel1/index.html',
            publicPath: '/'
        }),
        new HtmlWebpackPlugin({
            title: '多页面应用2',
            template: './public/index2.html',
            inject: 'body',
            chunks: ['main2', 'lodash'],
            filename: 'chanel2/index2.html',
            publicPath: '/'
        })
    ]
}
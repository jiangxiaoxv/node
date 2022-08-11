const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    output: {
        filename: 'scripts/[name].[contenthash:6].js',
        publicPath: 'http://localhost:8080'
    },

    mode: 'production',

    optimization: {
        minimizer: [
            new cssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(), // 只有生产环境才会有用
        ],
    },
    
    performance: {
        hints: false, // 只有生产环境控制台下面才有打包性能优化的信息
    }
}
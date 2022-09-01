// const fs = require('fs')
const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const resolve = dir => path.resolve(__dirname, dir)
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

module.exports = {
    mode: "development", // none production development
    entry: path.join(__dirname, "./app.js"),
    devServer: {
        port: 3000,
        static: "./dist", // 本地服务器所加载文件的目录，webpack5的配置
        compress: true,
        hot: true,
    },
    resolve: {
        alias: {
            "@": resolve("src"),
            "@config": resolve("config"),
        },
    },
    target: "web",
    output: {
        filename: "[name]_[contenthash:8].js",
        path: path.join(__dirname, "./dist"),
        clean: true, // 每次打包的时候清空dist目录内容
        // assetModuleFilename: 'images/[name][ext]', // asset/resource
    },
    optimization: {
        usedExports: true, // tree shaking
        minimize: true, // 代码压缩
        concatenateModules: true, // 尽可能的将所有模块合并输出到一个函数中，提升了运行效率，又压缩了代码
        sideEffects: true, // 检查package.json 的sideEffects,这里是开启这个功能
        splitChunks: {
            chunks: "all", // 会把所有的公共模块都提取出来
        },
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(), // 由minimize开关控制，这样打破了webpack自动压缩js的功能
            new TerserWebpackPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(html|html)$/,
                include: path.join(__dirname, "src/html"),
                use: {
                    loader: "html-loader",
                    options: {
                        // attrs: ['img:src', 'a:href'] webpack 4的语法
                        // esModule: false,
                        sources: {
                            list: [
                                "...", // 所有默认支持的标签和属性，这个一定要加上，不然就只会检测a标签了
                                {
                                    tag: "a",
                                    attribute: "href",
                                    type: "src",
                                },
                            ],
                        },
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            /* presets: [
                                ['@babel/preset-env', {modules: 'commonjs'}], // 这里会导致摇树优化失效，默认modules会根据环境进行auto处理
                                ['@babel/preset-env', {modules: false}] // 可以确保不会转化为commonjs规范，影响摇树优化
                            ] */
                        },
                    },
                ],
            },

            {
                test: /\.(png|jpe?g|ico|gif)$/i,
                type: "asset", // asset和asset/resource的区别就是，后者只做拷贝，不能配置转base64。
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb一下采用base64的dataURl
                    },
                },
                generator: {
                    filename: "images/[name]_[contenthash:8][ext]",
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new HtmlWebpackPlugin({
            // template: path.join(__dirname, "./src/html/index.html"),
            inject: "body", // 在body里面生成script
            title: "白嫖学习的",
            meta: {
                viewport: "width=device-width",
            },
            templateParameters: {
                h1text: "hello World",
            },
            filename: "index.html",
        }),
    ],
}


const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin');
console.log(DllPlugin)

module.exports = {
    mode: 'production',
    entry: {
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dll'),
        clean: true, // 每次打包的时候清空dist目录内容
        library: '[name]'
    },
    plugins: [
        new DllPlugin({
            name: '[name]',
            // path: path.join(__dirname, 'dll', '[name].manifest.json')
            path: path.resolve(__dirname, 'dll/manifest.json')
        })
    ]

}
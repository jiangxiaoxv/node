
module.exports = {
    output: {
        filename: 'scripts/[name].[contenthash:6].js',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
    },
}
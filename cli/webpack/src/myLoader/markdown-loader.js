
const {marked} = require('marked')
const htmlLoader = require('html-loader')
const fs = require('fs')
const path = require('path')

module.exports = source => {
    // 返回是一个html代码，需要包装成JavaScript
    const html = marked(source) // 字符串
    /* 处理、保留内部的换行符印号
    方式1
    return `module.exports = ${JSON.stringify(html)}` */
    // 方式2 返回html字符串交给下一个loader处理
    // console.log(html)
    // const realHtml = htmlLoader(html)
    // console.log('>>>>>>>', realHtml)
    // const pathName = path.resolve(__dirname, '../../dist/html/index.html')
    // fs.writeFileSync(pathName, html)
    return html
}
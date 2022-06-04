
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
    console.log('请求进来了')
    let {pathname, query} = url.parse(req.url)
    pathname = decodeURIComponent(pathname)
    let absPath = path.join(__dirname, '../www' ,pathname)
    console.log(absPath)
    fs.stat(absPath, (err, statObj) => {
        if (err) {
            res.statusCode = 404
            res.end('not found')
            return;
        }
        let contentType = mime.getType(absPath)
        if (statObj.isFile()) {
            fs.readFile(absPath, (err, data) => {
                res.setHeader('Content-type', `${contentType};charset=utf-8`)
                res.end(data)
            })
        } else {
            absPath = path.join(absPath, 'index.html')
            fs.readFile(absPath, (err, data) => {
                // res.setHeader('Content-type', 'text/html;charset=utf-8')
                res.setHeader('Content-type', `${contentType};charset=utf-8`)
                res.end(data)
            })
        }
    })
})
server.listen(8080, () => {
    console.log('server is start....')
})
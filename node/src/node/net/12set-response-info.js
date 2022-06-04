
const http = require('http')
const url = require('url')


const server = http.createServer((req, res) => {
    
    let {pathname, query} = url.parse(req.url, true)
    res.statusCode = 200
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end('降降火')
})

server.listen(8080, () => {
    console.log('server is start.....')
})
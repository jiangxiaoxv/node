const http = require('http')

let options = {
    host: 'localhost',
    port: 8081,
    path: '/',
    method: 'POST'
}

const server = http.createServer((request, response) => {
    let req = http.request(options, (res) => {
        let arr = []
        res.on('data', (data) => {
            arr.push(data)
        })
        res.on('end', () => {
            // console.log(Buffer.concat(arr).toString())
            let ret = Buffer.concat(arr).toString()
            response.setHeader('Content-type', 'text/html;charset=utf-8')
            response.end(ret)
        })
    })
    req.end('woc')
})


server.listen(8080, () => {
    console.log('本地的服务端起用了')
})

server.on('error', (error) => {
    console.log(error)
})




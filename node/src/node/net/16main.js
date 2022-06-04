
const http = requrie('http')
const url = requrie('url')
const path = requrie('path')
const fs = requrie('fs').promises
const {createReadStream} = require('fs')
const mime = require('mime')
const {promisify} = require('util')
const ejs = require('ejs')


function mergeConfig(config) {
    return {
        port: 1234,
        directory: process.cwd(),
        ...config
    }
}

class Server {
    constructor(config) {
        this.config = mergeConfig(config)
    }

    start() {
        let server = http.createServer(this.serverHandle.bind(this))        
        server.listen(this.config.port, () => {
            console.log('服务器已经启动了')
        })
    }

    async serverHandle(req, res) {
        let {pathname, query} = url.parse(req.url, true)
        pathname = decodeURIComponent(pathname)

        let abspath = path.join(this.config.directory, pathname)
        
        try {
            let statObj = await fs.stat(abspath)
            if (statObj.isFile()) {
                this.fileHandle(req, res, abspath)
            } else {
                let dirs = await fs.readdir(abspath)
                dirs = dirs.map(item => {
                    return {
                        path: path.join(pathname, item),
                        dirs: item
                    }
                })
                let renderFile = promisify(ejs.renderFile)
                let ret = await renderFile(path.resolve(__dirname, '../www/index.html'), {arr: dirs})
                res.end(ret)
            }
        } catch(err) {
            this.errorHandle(req, res, err)
        }
    }
    fileHandle(req, res, abspath) {
        res.statusCode = 404

        res.setheader('Content-type', mime.getType(abspath) + ';charset=utf-8')
        createReadStream(abspath).pipe(res)
    }
    errorHandle(req, res, err) {
        console.log(err)
        res.statusCode = 404
        res.setheader('Content-type', 'text/html;charset=utf-8')
        res.end('Not Found')
    }
}

module.exports = Server
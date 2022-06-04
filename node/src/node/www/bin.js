const {program} = require('commander')

// program.option('-p -port', 'set server port')
// program.parse(process.argv)

let options = {
    '-p --port <dir>': {
        'description': 'init server port',
        'example': 'lgserve -p 3306',
    },
    '-d --direcory <dir>': {
        'description': 'init server direcory',
        'example': 'lgserve -d c:',
    }
}

function fromatConfig(configs, cb) {
    Object.entries(configs).forEach((key, val) => {
        cb(key, val)
    })
}
fromatConfig(options, (cmd, val) => {
    program.option(cmd, val.description)
})

program.on('--help', () => {
    console.log('Example')
    fromatConfig(options, (cmd, val) => {
        console.log(val.example)
    })
})

program.name('lgserve')

let version = require('../../../package.json').version
program.version(version)

let cmdConfig = program.parse(process.argv)
// console.log(cmdConfig)

program.parse(process.argv)


let Server = require('../net/16main.js')
new Server(cmdConfig).start()

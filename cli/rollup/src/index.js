
import {log} from './logger'
import messages from './message'
import {name, version} from '../package.json'
// import _ from 'lodash-es'
import cjs from './seas.js'

const msg = messages.hi

log(msg)
log(name)
log(version)
// log(_.camelCase('hello world'))
log(cjs)

/* // 动态导入
import('./logger').then(({log}) => {
    log('code splitting-')
}) */
export const lover = 'l'

import fs from 'fs'
fs.writeFileSync('./foo.txt', 'es module working')

// Esmodule 中可以导入commonjs模块
// commonjs只能采用默认的导出方式，不能解构
import mod from './common.js'

export const foo = 'es module export value'





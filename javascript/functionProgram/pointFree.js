
const fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)
// console.log(f('Hello    World'))

// const firstLetterToUpper = fp.flowRight(fp.join('.'), fp.map(fp.first), fp.map(fp.toUpper), fp.split(/\s/))
// const firstLetterToUpper = fp.flowRight(fp.join('.'), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(/\s/))
// console.log(firstLetterToUpper('world wild web'))


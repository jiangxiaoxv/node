import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

 export default {
    input: {
        foo: 'src/index.js',
        bar: 'src/album.js'
    },
    output: {
        // file: 'dist/main.js',
        // format: 'iife',
        dir: 'dist',
        format: 'amd'
    },
    // 将调用的结果放进去
    plugins: [
        json(),
        resolve(),
        commonjs(),
    ]
 }

// gulp 的入口文件

exports.foo = (done) => {
    console.log('foo task working-')

    done() // 标识任务完成
}

/* exports.default = done => {
    console.log('feault task working -')

    done()
} */

const gulp = require('gulp')
gulp.task('bar', done => {
    console.log('bar working')
    done()
})


const {series, parallel, task} = require('gulp')

const task1 = done => {
    setTimeout(() => {
        console.log('task1 working')
        done()
    }, 1000);
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 working')
        done()
    }, 1000);
}

const task3 = done => {
    setTimeout(() => {
        console.log('task3 working')
        done()
    }, 1000);
}

// 组合任务串行的
exports.componse = series(task1, task2, task3)

// 组合任务并行的,同步执行任务
exports.componseParallel = parallel(task1, task2, task3)


// 异步的
exports.callback = done => {
    console.log('callback task--')
    done()
}

exports.callback_error = done => {
    console.log('callback_error task--')
    done(new Error('task failed'))
}

exports.promise = done => {
    console.log('promise task--')
    return Promise.resolve()
}

exports.promise = done => {
    console.log('promise task--')
    return Promise.reject(new Error('task failed-'))
}

const timeout = time => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('setTimeout resolve')
            resolve()
        }, time);
    })
}

exports.async = async () => {
    await timeout(1000)
    console.log('async task-')
}

const fs = require('fs')

exports.stream = () => {
    const readStream = fs.createReadStream('package.json')
    const writeStream = fs.createWriteStream('temp.txt')

    readStream.pipe(writeStream)
    // readStream 又个end事件
    return readStream
}

exports.stream2 = (done) => {
    const readStream = fs.createReadStream('package.json')
    const writeStream = fs.createWriteStream('temp.txt')

    readStream.pipe(writeStream)
    readStream.on('end', () => {
        done()
    })
    // return readStream
}


// 核心工作原理
const {Transform} = require('stream')
exports.default = () => {
    const read = fs.createReadStream('package.json')
    const write = fs.createWriteStream('temp.txt')

    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            const input = chunk.toString()
            const output = input.replace(/(\s+)|(\n)/g, '')
            callback(null, output)
        }
    })

    read.pipe(transform).pipe(write)

    return read
}

const {src, dest} = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')
exports.plugins = () => {
    // return src('package.json').pipe(dest('dist'))
    return src('src/*.css', {base: 'src'})
    .pipe(cleanCss())
    .pipe(rename({'extname': '.min.css'}))
    .pipe(dest('dist'))
}
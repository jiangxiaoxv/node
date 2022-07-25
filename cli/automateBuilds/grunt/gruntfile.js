// Grunt 的入口文件
// 用于定义一些需要Grunt 自动化执行的任务
// 需要导出一个函数
// 此函数接受一个Grunt的形参，内部提供一些穿件任务时可以用到的API
const sass = require('sass')
const loadGruntTask = require('load-grunt-tasks')
const { task } = require('grunt')
module.exports = grunt => {
    grunt.initConfig({
        // foo: 'bar'
        foo: {
            bar: 123
        }
    })

    grunt.registerTask('fooc', () => {
        // console.log(grunt.config('foo'))
        console.log(grunt.config('foo.bar'))

    })

    grunt.registerTask('foo', () => {
        console.log('hello grunt-')
    })

    grunt.registerTask('bar', '任务描述', () => {
        console.log('other task-')
    })

    /* grunt.registerTask('default', () => {
        console.log('default task-')
    }) */

    // 异步的
    grunt.registerTask('async-task', function() {
        const done = this.async()
        setTimeout(() => {
            console.log('async task working')
            done()
        }, 100)
    })

    // 错误的任务. 阻塞后续任务
    grunt.registerTask('bad', '任务描述', () => {
        console.log('bad workding-')
        return false
    })

    // 异步的 错误任务
    grunt.registerTask('bad-async', function() {
        const done = this.async()
        setTimeout(() => {
            console.log('async task working')
            done(false)
        }, 100)
    })

    // grunt.registerTask('default', ['foo', 'bad-async', 'bad','bar', 'async-task']) // yarn grunt
    

    // 多目标模式，可以让任务根据配置形成多个字任务
    grunt.initConfig({
        build: {
            options: {
                foo: 'bar'
            },
            css: {
                options: {
                    foo: 'baz' // 覆盖父级任务的foo
                }
            },
            js: '2'   // js 目标
        }
    })
    grunt.registerMultiTask('build', '任务描述', () => {
        // console.log('build task')
        // console.log(`target: ${this.target}, data: ${this.data}`)
        console.log(this)
    })

    /* // 插件
    grunt.initConfig({
        clean: {
            temp: 'temp/app.js', // 删除文件
            all: 'temp/*.txt',
            // allPath: 'temp/**'
        }
    })
    grunt.loadNpmTasks('grunt-contrib-clean') // yarn grunt clean
 */

    // grunt 常用的构建任务
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env'],
                sourceMap: true,
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['scss']
            }
        }
    })
    // grunt.loadNpmTasks('grunt-sass')


    // babel
    loadGruntTask(grunt) // 自动加载所有的grunt插件中的任务
    
    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}
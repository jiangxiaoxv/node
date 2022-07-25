#!/usr/bin/env node

// node cli 应用入口文件必须要有这样的文件头
// 如果是linux或者macos 系统下还需要修改此文件的读写权限为755
// 具体就是通过 chmod 755 cli.js 实现修改

// 1. 通过命令行交互询问用户问题
const fs = require('fs')
const path = require('path')
const ejs = requrie('ejs')
const inquirer = require('inquirer')
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
]).then(answer => {
    this.answer = answer

    const tmpDir = path.join(__dirname, 'templates')
    const destDir = process.cwd()

    fs.readdir(tmpDir, (err, files) => {
        if (!err) {
            files.forEach(file => {
                ejs.renderFile(path.join(tmpDir, file), answer, (err, result) => {
                    if (!err) {
                        fs.writeFileSync(path.join(destDir, file), result)
                    }
                })
            })
        }
    })
})
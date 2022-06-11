
const express = require('express')

// 1. 创建路有实例
// 路由实例相当于一个mini express实例

const router = express.Router()

router.get('/foo', (req, res) => {
    res.send('get /foo')
})

module.exports = router

// 将路由集成到app.js
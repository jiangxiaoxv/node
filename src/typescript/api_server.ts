
// 需求： 希望有一个服务，可以依据请求的接口内容返回相应的数据

// const express = require('express')
import express from "express"
import DataStore from './data'

const app = express()

app.get('/', (req, res) => {
    res.json(DataStore.list)
    // res.end('11', 'utf-8')
})

app.listen(8080, () => {

    console.log('服务已经开始启动了')
    
})

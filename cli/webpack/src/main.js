import {lover} from './module'
import './css/index.css'
import '../index.md'


const p = new Promise((res, rej) => {
    setTimeout(() => {
        console.log('舒适')
        res(12)
    }, 1000);
})
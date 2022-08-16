import {lover} from './module'
import './css/index.css'
// import '../index.md'


const p = new Promise((res, rej) => {
    setTimeout(() => {
        fetch('/api/users').then(res => {
            console.logs(res)
            
        }, err => {
            console.logs(err)
            // console.log(err)
        })
    }, 1000);
})
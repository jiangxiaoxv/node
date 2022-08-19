import {lover} from './module'
import './css/index.css'
// import '../index.md'

console.log(2)
const p = new Promise((res, rej) => {
    alert(1)
    setTimeout(() => {
        fetch('/api/users').then(res => {
            // console.logs(res)
        }, err => {
            // console.log(err)
        })
    }, 1000);
})
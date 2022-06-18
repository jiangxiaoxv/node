
function ajax(url) {
    return new Promise(function(resolve, reject) {

        const xhr = new XMLHttpRequest()

        xhr.open('GET', url)

        xhr.responseType = 'json'

        xhr.onload = function() {
            if (this.status === 200) {
                resolve(xhr.response)
            } else {
                reject(new Error(xhr.statusText))
            }
        }
        xhr.send()
    })
}

/* window.addEventListener('unhandledrejection', event => {
    const {reason, promise} = event
    // reason =》promise失败的原因，一般是一个错误对象
    // promise =》出现异常的promise对象
    event.preventDefault()
}, false) */

/* process.addEventListener('unhandledRejection', (reason, promise) => {

    // reason =》promise失败的原因，一般是一个错误对象
    // promise =》出现异常的promise对象

}, false) */

/* console.log('1')
setTimeout(() => {
    console.log(7)
}, 100)
let promise = new Promise((res, rej) => {
    console.log(2)
    res()
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(4)
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 100)
    })
}).then(() => {
    console.log(5)
})
console.log(6) */

module.exports = ajax
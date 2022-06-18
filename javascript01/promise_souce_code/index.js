
/**
 * 
 * 1. Promise 就是一个类
 *    在执行这个类的时候，需要传递一个执行器进去，
 *    执行器会立即执行
 * 2. promise 中有三种状态 分别为成功fulfilled、失败 rejected、等待pending
 *    pending -> fulfilled
 *    pending -> rejected
 *    一旦状态确定就不可更改
 * 
 * 3. resolve和reject函数是用来更改状态的
 *    resolve： fullfilled
 *    reject: rejected
 * 
 * 4. then方法内部做的事情就判断状态，如果状态是成功 调用成功的回调函数
 *    如果状态是失败，就调用失败的回调方法
 *    是定义在原型对象当中
 * 5. then成功回调有一个参数，表示成功之后的值
 *    then失败回调有一个参数，表示失败的原因
 * 
 * 6. finally
 * 
 */

const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败


class MyPromise {
    
    status = PENDING
    
    value = undefined // 成功的值
    reasson = undefined // 失败后的原因

    sucessCallback = [] // 成功回调
    failCallback = [] // 失败回调

    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch(err) {
            this.reject(err)
        }
    }

    resolve = (value) => {
        // 如果状态不是等待 组织程序向下执行
        if (this.status != PENDING) {
            return
        }
        // 将状态更改为成功
        this.status = FULFILLED
        //  保存成功之后的值
        this.value = value
        // 判断成功回调是否存在 如果存在 调用
        // this.sucessCallback && this.sucessCallback(value)
        while(this.sucessCallback.length) {
            this.sucessCallback.shift()()
        }
    }

    reject = (reason) => {
        // 如果状态不是等待 组织程序向下执行
        if (this.status != PENDING) {
            return
        }
        // 将状态更改为失败
        this.status = REJECTED
        // 保存失败后的原因
        this.reasson = reason
        // 判断失败回调是否存在 如果存在 调用
        // this.failCallback && this.failCallback(reason)
        while(this.failCallback.length) {
            this.failCallback.shift()()
        }
    }

    then (sucessCallback, failCallback) {
        if (sucessCallback == null) {
            sucessCallback = value => value
        }
        if (failCallback == null) {
            failCallback = reason => {
                throw reason
            }
        }
        let promise2 = new MyPromise((resolve, reject) => {
                // 判断状态
            if (this.status === FULFILLED) {
                // 解决promise2拿不到的问题采用setTimeout
                setTimeout(() => {
                    try {
                        let x = sucessCallback(this.value)
                        // 判断 x 是普通值还是promise
                        // 如果是普通，直接resolve
                        // 如果是promise， 查看promise对象返回的结果
                        // 再根据promise对象返回的结果， 决定调用resolve，还是reject
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)

            } else if(this.status === REJECTED) {
                
                // 解决promise2拿不到的问题采用setTimeout
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reasson)
                        // 判断 x 是普通值还是promise
                        // 如果是普通，直接resolve
                        // 如果是promise， 查看promise对象返回的结果
                        // 再根据promise对象返回的结果， 决定调用resolve，还是reject
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
                
            } else {
                // 等待
                // 将成功回调与失败回调保存下来
                this.sucessCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = sucessCallback(this.value)
                            // 判断 x 是普通值还是promise
                            // 如果是普通，直接resolve
                            // 如果是promise， 查看promise对象返回的结果
                            // 再根据promise对象返回的结果， 决定调用resolve，还是reject
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })

                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reasson)
                            // 判断 x 是普通值还是promise
                            // 如果是普通，直接resolve
                            // 如果是promise， 查看promise对象返回的结果
                            // 再根据promise对象返回的结果， 决定调用resolve，还是reject
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }

    finally(callback) {
        return this.then((value) => {
            return MyPromise.resolve(callback()).then(() => {
                return value
            })
            
        }, (reason) => {
            return MyPromise.resolve(callback()).then(() => {
                throw reason;
            })
        })
    }

    catch(failCallback) {
        return this.then(undefined, failCallback)
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then((res) => {
                    resolve(res)
                }, err => {
                    resolve(err)
                })
            } else {
                resolve(value)
            }
        })
    }

    static all(array) {
        if (!Array.isArray(array)) {
            return new Error('不是数组')
        }
        const len = promiseArr.length
        const result = []
        let index = 0
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                const current = array[i]
                MyPromise.resolve(current).then((value) => {
                    index++
                    result[i] = value
                    if (index === len) {
                        resolve(result)
                    }
                }, err => {
                    reject(err)
                })
                
            }
        })
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 解决循环调用的问题
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof MyPromise) {
        x.then(resolve, reject)
        /* x.then((value) => {
            resolve(value)
        }, (reason) => {
            reject(reason)
        }) */
    } else {
        resolve(x)
    }
}


Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log) // 1
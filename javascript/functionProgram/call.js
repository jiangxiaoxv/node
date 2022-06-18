/* 
function fn(a, b, c) {
    return a + b + c
}

fn.call(context, 1, 2, 3) */

Function.prototype.myCall = function(context, ...rest) {
    
    const symbol = Symbol()
    context[symbol] = this
    const result = context[symbol](...rest)
    delete context[symbol]
    
    return result
}
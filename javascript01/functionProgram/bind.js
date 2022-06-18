

Function.prototype.myBind = function(context, ...args) {
    return (...rest) => this.call(context, ...args, ...rest)
}
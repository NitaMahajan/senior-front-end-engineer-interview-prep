// call is a property of Function.prototype. It accepts a context and args
// we know that function gets its context based on how it is called so we explicitly
// set the function as a property of the context object
// and then call it with the context as thisArg
Function.prototype.myBind = function (thisArg, ...args) {
    const fn = this;
    const context = Object(thisArg);
    context.fn = fn;
    return function(...rest) {
        const result = context.fn(...args, ...rest);
        delete context.fn;
        return result;
    }
}
function myLog (a, b, c, d) {
    return `Logging: [${a},${b},${c},${d}] in the context of ${this.note}`;
}

const ctxObject = { note: 'Lets test this out'};

const boundedLog = myLog.myBind(ctxObject, 3,5);
console.log(boundedLog(1, 2)); // Logging: [3,5,1,2] in the context of Lets test this out
 



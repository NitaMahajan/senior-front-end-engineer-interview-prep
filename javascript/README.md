# *Closures*

Closure is a function which remembers the lexical environment in which it was created even after the environment has gone away.

Difficult Interview Questions on Closures:

1. Question: What will be logged to the console and why?
function makeAdder(x) {
    return function(y) {
        return x + y;
    }
}
var add5 = makeAdder(5);
var add10 = makeAdder(10);
console.log(add5(2)); // ?
console.log(add10(2)); // ?

Answer:
7 and 12. Each call to makeAdder creates a new closure with its own 'x' value.

2. Question: What will be the output and why?
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 100);
}

Answer:
It will log 3 three times. The variable 'i' is shared across all closures due to 'var' being function-scoped, so by the time the callbacks run, 'i' is 3.

3. Question: How can you modify the above loop to log 0, 1, 2 instead?
Answer:
Use 'let' instead of 'var', or create a new scope using an IIFE:
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 100);
}
// or
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, 100);
    })(i);
}

4. Question: What is a memory leak in the context of closures?
Answer:
A memory leak can occur if a closure unintentionally retains references to variables or objects that are no longer needed, preventing them from being garbage collected.

5. Question: Can closures be used to implement private variables in JavaScript? Give an example.
Answer:
Yes. Example:
function Counter() {
    let count = 0;
    return {
        increment: function() { count++; return count; },
        decrement: function() { count--; return count; }
    };
}
const c = Counter();
console.log(c.increment()); // 1
console.log(c.decrement()); // 0
// 'count' is private to the Counter function.
*/

/*
More Difficult Interview Questions on Closures:

6. Question: What will the following code output and why?
function createFunctions() {
    var funcs = [];
    for (var i = 0; i < 3; i++) {
        funcs[i] = function() {
            return i * 2;
        };
    }
    return funcs;
}
var functions = createFunctions();
console.log(functions[0]()); // ?
console.log(functions[1]()); // ?
console.log(functions[2]()); // ?

Answer:
All will log 6. The variable 'i' is shared due to 'var', so after the loop, i is 3. Each function returns 3 * 2 = 6.

7. Question: How can you modify the above code so that each function returns 0, 2, and 4 respectively?
Answer:
Use 'let' instead of 'var', or an IIFE to capture the current value of 'i':
for (let i = 0; i < 3; i++) {
    funcs[i] = function() { return i * 2; };
}
// or
for (var i = 0; i < 3; i++) {
    (function(j) {
        funcs[j] = function() { return j * 2; };
    })(i);
}

8. Question: Explain how closures can cause unexpected behavior in asynchronous code, and how to avoid it.
Answer:
Closures capture variables by reference, not by value. In asynchronous code (like setTimeout in a loop), all callbacks may reference the same variable, leading to unexpected results. Use 'let' or IIFE to capture the current value.

9. Question: What is the difference between closure and scope chain?
Answer:
Scope chain is the hierarchy of scopes at runtime, while a closure is a function that remembers variables from its lexical scope even after the outer function has finished executing.

10. Question: Can closures be used to create singleton objects? How?
Answer:
Yes. By using an IIFE that returns an object, you can encapsulate private state and ensure only one instance exists:
const singleton = (function() {
    let privateVar = 0;
    return {
        get: function() { return privateVar; },
        set: function(val) { privateVar = val; }
    };
})();

# *Hoisting*

Ability to use variables and functions before they are declared in the code.
Variables, function declarations and classes are moved to the top of their scope.

var variables are hoisted and initialised as undefined

let and const variables are hoisted but not initialised. 
You will get reference error if you try to access them before declaration since they are in temporal dead zone.

function expressions ex. function greeting() { console.log('something'); } are hoisted and can be accessed before declaration

function expression using let var const are not hoisted in same way.

// 1. What will be logged to the console and why?
console.log(a);
var a = 10;

// 2. What will be the output and why?
function test() {
    console.log(b);
    var b = 20;
}
test();

// 3. What happens here?
console.log(typeof foo);
foo();
function foo() {
    console.log('Hello');
}

// 4. What will be the result and why?
bar();
var bar = function() {
    console.log('World');
};

// 5. What does this print and why?
var x = 1;
function hoist() {
    console.log(x);
    var x = 2;
}
hoist();

// 6. What is the output?
let y = 5;
function example() {
    console.log(y);
    let y = 10;
}
example();

// 7. What will happen here?
(function() {
    console.log(z);
    var z = 100;
})();

// 8. What is the output and why?
function outer() {
    inner();
    function inner() {
        console.log('Inner function hoisted');
    }
}
outer();

// 9. What happens if you use const or let instead of var?
console.log(a);
let a = 3;

// 10. What will be printed?
var m = 1;
function foo2() {
    if (!m) {
        var m = 2;
    }
    console.log(m);
}
foo2();

# *Event Loop*

Event loop is the mechanism by which javascript, despite being a single threaded language is able to run async code. It ensures that non-blocking operations are executed efficiently without freezing the main thread.

Elements of event loop mechanism
1. Call stack : Tracks all the function calls made by main thread. When function is invoked it gets pushed here.
2. Web APIs: Async ops like setTimeout, fetch are handled by browser/node.js and not js. These ops are sent to them in background
3. Callback queue (task queue): Once these async processes complete, they are sent to the callback queue waiting to be executed by main thread.
There are two queues: MicroTask (High priority - Promise.then / MutationObserver) and MacroTask (Low Priority - setTimeout, setInterval, I/O)
4. Event loop: Event loop continously checks if the call stack is empty, if yes, then it takes the first task from the callback queue and adds to call stack to get executed. 

# *Promises*

Promise is an object in javascript that represent the eventual completion or rejection of an async operation and its resulting value.

const myPromise = new Promise((resolve, reject)) {
    const success = true;
    if (success) {
        resolve('ops succeed');
    } else {
        reject('ops failed');
    }
}

myPromise.then((result) => {
    console.log()
}).catch((error) => {
    console.log(error)
});

# *Async/Await*

Fancier way of using Promises.

async function processUserOrder(userId) {
  try {
    const user = await getUserData(userId);
    const orders = await getOrders(user);
    const details = await getOrderDetails(orders[0]);
    const result = await processOrder(details);
    console.log("Order processed:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

processUserOrder(userId);
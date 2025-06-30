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
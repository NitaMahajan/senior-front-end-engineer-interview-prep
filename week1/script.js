
// Array.prototype.map((value, index) => {

// });

// Memoize function

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('Promise 1 rejected...');
//     }, 2000);
// });
// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('Promise 2 rejected...');
//     }, 4000);
// });

Promise.myAny = function(promises) {
    
    // return the first fulfilled promise
    // however if none are fulfilled, returns an array of errors
    let error_results = [];
    let totalPromisesSettled = 0;
    return new Promise((resolve, reject) => {

        promises.forEach((promise, index) => {

            Promise.resolve(promise).then((value) => {
                resolve(value);
            })
            .catch((error) => {

                totalPromisesSettled++;
                error_results[index] = error;

                if (totalPromisesSettled == promises.length) {
                    reject(new AggregateError(error_results, 'All Promises Rejected'));
                }

            });
        })


    });
    
}

// Promise.all([promise1, promise2]).then((result) => console.log(result)).catch(err => console.log(err));
console.log('Promise.myAny:')
// Promise.myAny([
//     new Promise((resolve, reject) => setTimeout(() => reject(1), 0)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(3), 0)),
//     new Promise((resolve, reject) => setTimeout(() => reject(4), 0)),
// ]).then((result) => console.log(result)).catch(err => console.log(err));

Promise.myAny([
    new Promise((resolve, reject) => setTimeout(() => reject(100), 2000)),
    Promise.reject(101),
    Promise.reject(102),
    new Promise((resolve, reject) => setTimeout(() => reject(103), 0)),
    Promise.reject(104),
]).then((result) => console.log(result)).catch(err => console.log(err));


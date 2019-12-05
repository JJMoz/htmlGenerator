let needToUpdate = 0;

let myFirstPromise = new Promise((resolve,reject) => {

    resolve();

});

myFirstPromise.then(() => {console.log("This promise was fulfilled!")});

console.log("This runs after calling the Promise. ");
/*let needToUpdate = 0;

let myFirstPromise = new Promise((resolve,reject) => {

    resolve();

});

myFirstPromise.then(() => {console.log("This promise was fulfilled!")});

console.log("This runs after calling the Promise. ");*/

// celsius *9/5 + 32

let convertToF = (celsius) => {
    return(celsius * (9/5)) +32;
};
console.log(convertToF(22));

let convertToC = (feren) => {
    return ((feren - 32) * 5) / 9;
}


// combine the above functions together
// function convertToTempScale(){}
let convertToTempScale = (scale, temp) => {
    if (scale === "f") {
        return convertToF(temp);
    } else if (scale === "c") {
        return convertToC(temp);
    } else {
        return NaN;
        }
};

console.log(convertToTempScale("c", 24) );

//callback function
let convertTempCustom = (temp, equation) => {
    return equation(temp);
};
console.log( convertTempCustom(32,convertToC));

console.log (convertTempCustom(32,(f, convertFunction) =>{
    return convert(f) + 273.15;
}) );




let  myArray =[100, 32, 4993, 392, 30, 30];

let newArray = myArray.map((num) => {
    return num *2;
})

console.log( myArray, "\n", newArray);



//
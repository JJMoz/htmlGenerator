  
const md5 = require("md5");

let passwordToHash = "";
let salt = "there were 10 cows on the prairie";
//123456
console.log( md5( "e10adc3949ba59abbe56e057f20f883e" + "There were 10 cows on the prairie!" ) );
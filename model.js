const auth = require("./assets/auth.js");
const mongoose = require("mongoose");
const md5 = require("md5");
let authenticated = -1;

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.connect(auth.getDBURL(), options, (error) => {
    if (error) {
        console.log("Something happened at MongoDB Headquarters: " + error.reason);
    } else {
        console.log("Connected to MongoDB Atlas!");
    }
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection Error: "));

mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;

let accountSchema = new Schema({
    fname: String,
    lname: String,
    username: String,
    email: String,
    password: String,
    creationDate: Date,
    lastLogin: Date,
    projectID: String
});

let accountModel = new mongoose.model("accounts", accountSchema);


// async function searchDB(searchCriteria) {
//     return new Promise((resolve, reject) => {
//         accountModel.find(searchCriteria, (error, results) => {});
//     });
// }


async function checkLogin(username, password) {
    let hashedAndSaltedPassword = md5(password + auth.getSalt());
    console.log(hashedAndSaltedPassword);
    let searchCriteria = {
        username: username,
        password: hashedAndSaltedPassword
    };
//shorter way to do the commented out code below.. makes into promise... // exec makes it to a promise
    return accountModel.find(searchCriteria).exec();

//converts into a Promise "exec" mongoose exec
   // let result = accountModel.find(searchCriteria, (error, results) => {
   //     if (error) {console.log(error.reason);}  
    //}).exec();
   // return result;

}

//function updateAuthentication(value) {authenticated = value;}

async function createAccount(newAccount) {

    let returnValue = null;

    checklogin(newAccount.username, newAccount.password).then((results) => {

        if (results.length >= 1) {
           
    } else {
    let account = new accountModel({
        fname: newAccount.fname,
        lname:  newAccount.lname,
        username:  newAccount.username,
        email:  newAccount.email,
        password: md5(newAccount.password + auth.getSalt()),
        creationDate:  newAccount.Date(),
        lastLogin:  newAccount.Date(),
        projectID:  Math.floor( (Math.random() * 100000) + 1)
    });

  returnValue = account.save();  
}


module.exports = {
    checkLogin: checkLogin,
    createAccount: createAccount
}
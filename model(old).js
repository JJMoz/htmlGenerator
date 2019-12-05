

const auth = require ("./assets/auth.js");
const mongoose = require("mongoose");
const md5 =require("md5");
let authenticated =-1;

//---- BELOW CODE IS FROM MONGO.JS FILE FROM THE MONGODB PRACTICE PROJECT THERE IS COMMENTS IN THAT FILE
// Additional options when connecting to MongoDB
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

// mongoose method.... Actually connect to the MOngoDB database. Attach the login crednitals string and the options object.
mongoose.connect(auth.getDBURL(), options, (error) => { 
    if (error) {
        console.log("Something happened at MongoDB Headquarters: " + error.reason);
    } else {
        console.log("Connected to MongoDB Atlas!");
    }

} );

let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection Error: "));

mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;

let accountSchema = new Schema ({
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

function checkLogin(username, password) {
    let hashedAndSaltedPassword = md5(password + auth.getSalt());

    

    let searchCriteria = {
        username: username,
        password: hashedAndSaltedPassword
    };
// send to database
    accountModel.find(searchCriteria, (error, results) => {
        if(error) {
            console.log(error);
        } else {
            if (results.length === 0) {
               // console.log("Wrong username or password");
                updateAuthentication(false);
            } else if (results.length === 1) {
                updateAuthentication(true);
               // console.log("Successfully Logged In ");
            } else {
                updateAuthentication(-1);
               // console.log ("We have two entries that match the username and password, this is a DB issue" );
            }
         }
//runs after the "accountModel.find" runs
    }).then(() => {return authenticated});

        return authenticated;
}

function updateAuthentication(value) {
    authenticated = value;
}

module.exports = {
    checkLogin: checkLogin
}
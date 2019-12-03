const auth = require ("./assets/auth.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = (require("http").Server(app));
const port = 3000;
http.listen(port);
console.log("The express server is running on port " + port + "!");
console.log(auth.getDBURL());

// ABOVE CODE IS WHAT IS NEEDED TO CREATE A EXPRESS SERVER (this is the simple/basic plan for a Express Server, there are many ways. new updates can create more ways).... Look at request index.js file for more comments

//ROUTES. connects intex.html to index.js which is connected to the server
app.use(express.static("client/"));
// Needed to read data sent through POST request.....body- parser package (comes with express) is need to read data sent through POST request
//Needed to understand data from Server.
app.use(bodyParser.json());
// Gives Body Parsr specific option to run off of... should extended below be dark blue?
app.use(bodyParser.urlencoded({extended: false}));


app.post("/login", (request, response) => {
    let requestUsername = request.body.username;
    let requestPassword = request.body.password;

    console.log (requestUsername, requestPassword)

    response.sendStatus(200);
});


// mongodb+srv://htmlGeneratorAdmin:<password>@cluster0-urgu0.mongodb.net/test?retryWrites=true&w=majority
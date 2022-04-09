let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser')
const fileupload = require("express-fileupload");
let bcrypt = require('bcrypt')
const saltRounds = 10;

let app = express();
const port = process.env.PORT || 5000

app.use(fileupload());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, DELETE, PUT");
    next();
});
let advertisement = require('./routes/advertisement');
app.use("/",advertisement);
let company = require('./routes/company');
app.use("/",company);
let user = require('./routes/user');
app.use("/",user);
let job_application = require('./routes/job_application');
app.use("/",job_application);
let register = require('./routes/register');
app.use("/", register);
let search= require('./routes/search');
app.use("/", search);

app.listen(port, () => console.log(`listen on: ${port}`));
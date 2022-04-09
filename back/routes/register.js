var express = require('express');
var router = express.Router();
let mysql = require('mysql');
let bcrypt = require('bcrypt');


let pool = mysql.createPool({
    connectionLimit: 10,
    host:'localhost',
    port: 3306,
    user:'root',
    password:'',
    database:'jobboard'
});


router.post('/register', (req, res) => {
    pool.getConnection((err, connection) => {
        console.log("body= ", req)
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`);
        connection.query('SELECT * FROM user WHERE email =?',
            req.body.email,
            (err, results) => {
                connection.release()
                if (results.length > 0) {
                    bcrypt.compare(req.body.password, results[0].password, (err, response) => {
                        if(response) {
                            res.json(results)
                        } else {
                            res.send({message: "Wrong Email or Password combination ! "})
                            res.status(404);
                        }
                    })
                } else {
                    res.send({message: "User doesn't exist"})
                    res.status(404);
                }
            })
    })
})


module.exports = router;
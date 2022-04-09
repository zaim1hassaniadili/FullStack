var express = require('express');
var router = express.Router();
let mysql = require('mysql');
let bcrypt = require('bcrypt')

let pool = mysql.createPool({
    connectionLimit: 10,
    host:'localhost',
    port: 3306,
    user:'root',
    password:'',
    database:'jobboard'
});

const saltRounds = 10;

router.get('/user/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("SELECT * FROM user", (err, rows) => {
            connection.release()
            if (!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
})
router.post('/user/', (req, res) => {
    console.log("YES your in post",req.body)
    pool.getConnection((err, connection) => {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) throw err
            console.log(`connected as id ${connection.threadId}`);
            connection.query(`INSERT INTO user (email, password, lastName, firstName, birthday,role) VALUES(?,?,?,?,?,?)`,[req.body.email,hash,req.body.lastName,req.body.firstName,req.body.birthday, req.body.role], (err, results) => {
                connection.release()
                if (!err) {
                    res.json(results)
                } else {
                    res.json(err);
                }
            })
        })
    })
})
router.delete('/user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("DELETE FROM user WHERE id_user =?",[req.params.id] , (err) => {
            connection.release()
            if (!err) {
                res.send("GOOD DELETE");
            }
            else
                console.log(err)
        })
    })
})
router.put('/user/:id', (req, res) => {
    console.log(req.body)    
 
    pool.getConnection((err, connection) => {
        if (err) throw err
       
        console.log(`connected as id ${connection.threadId}`);
       connection.query(`UPDATE user SET email=?, lastName=?, firstName=?, birthday=?, role=? WHERE id_user=${req.params.id}`,[req.body.email, req.body.lastName,req.body.firstName,req.body.birthday,req.body.role], (err, results) => {
     
            connection.release()
          
            if (results) {
                console.log(results);
                res.json(results)
            } else {
                console.log(err);
                res.json(err);
            }
        })

     })
})





module.exports = router;
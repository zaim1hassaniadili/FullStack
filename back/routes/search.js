var express = require('express');
var router = express.Router();
let mysql = require('mysql');


let pool = mysql.createPool({
    connectionLimit: 10,
    host:'localhost',
    port: 3306,
    user:'root',
    password:'',
    database:'jobboard'
});




router.get('/search/:domaine/:contract', (req, res) => {
    console.log("from body",req.params)
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`);

        connection.query("SELECT * FROM advertisement WHERE domaine=? AND contract=?",[req.params.domaine, req.params.contract], (err, results) => {

            connection.release()
            if (!err) {
                res.json(results)
            } else {
                res.json(err);
            }
        })

    })
})

module.exports = router;
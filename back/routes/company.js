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

router.get('/company', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("SELECT * FROM company", (err, rows) => {
            connection.release()
            if (!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
})

router.delete('/company/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("DELETE FROM company WHERE id_company =?",[req.params.id] , (err) => {
            connection.release()
            if (!err) {
                res.send("GOOD DELETE");
            }
            else
                console.log(err)
        })
    })
})

router.post('/company', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query(`INSERT INTO company (name, address, web_site) VALUES(?,?,?)`,[req.body.name,req.body.address,req.body.web_site],(err, results) => {
            connection.release()
            if (!err) {
                res.json(results)
            } else {
                res.json(err);
            }
        })

    })
})
router.put('/company/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`);
        connection.query("UPDATE company SET name= ?, web_site=?, address=? WHERE id_company=?",[req.body.name, req.body.web_site, req.body.address, req.params.id], (err, results) => {
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
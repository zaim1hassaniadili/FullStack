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


router.get('/advertisement/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query(`SELECT * FROM advertisement WHERE id_advertisement=${req.params.id}`, (err, rows) => {
            connection.release()
            if (!err)

                res.send(rows);
            else
                console.log(err)
        })
    })
})

router.get('/advertisement', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("SELECT * FROM advertisement", (err, rows) => {
            connection.release()
            if (!err)
                res.send(rows);

            else
                console.log(err)
        })
    })
})

router.delete('/advertisement/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("DELETE FROM advertisement WHERE id_advertisement =?",[req.params.id] , (err) => {
            connection.release()
            if (!err) {
                res.send("GOOD DELETE");
            }
            else
                console.log(err)
        })
    })
})

router.post('/advertisement', (req, res) => {
    console.log(req.body)
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query(`INSERT INTO advertisement (title, release_date, description,domaine, contract, city) VALUES (?,?,?,?,?,?)`,[req.body.title,req.body.release_date,req.body.description,req.body.domaine,req.body.contract, req.body.city], (err, results) => {
            connection.release()
            if (!err) {
                res.json(results)
            } else {
                res.json(err);
            }
        })

    })
})

router.put('/advertisement/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`);

        connection.query("UPDATE advertisement SET title=?,release_date=?, description=? WHERE id_advertisement=?",[req.body.title,req.body.release_date,req.body.description,req.params.id], (err, results) => {

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
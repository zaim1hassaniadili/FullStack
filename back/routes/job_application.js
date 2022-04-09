
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


router.get('/job_application', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("SELECT * FROM job_application", (err, rows) => {
            connection.release()
            if (!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
})

router.get('/job_application/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("SELECT * FROM job_application WHERE id_job =?",[req.params.id], (err, rows) => {
            connection.release()
            if (!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
})

router.delete('/job_application/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query("DELETE FROM job_application WHERE id_job =?",[req.params.id] , (err) => {
            connection.release()
            if (!err) {
                res.send("GOOD DELETE");
            }
            else
                console.log(err)
        })
    })
})
router.post('/job_application', (req, res) => {
    console.log(req.body)
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`);
        connection.query(`INSERT INTO job_application (email, lastName, firstName, birthday, motivation) VALUES(?,?,?,?,?)`, [req.body.email,req.body.lastName,req.body.firstName,req.body.birthday,req.body.motivation],(err, results) => {
            connection.release()
            if (!err) {
                res.json(results)
            } else {
                res.json(err);
            }
        })

    })
})


router.put('/job_application/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
            console.log(`connected as id ${connection.threadId}`);
        connection.query(`UPDATE job_application SET motivation= "${req.body.motivation}",email= "${req.body.email}",lastName= "${req.body.lastName}",firstName= "${req.body.firstName}",birthday= "${req.body.birthday}" WHERE id_job=${req.params.id}` , (err, results) => {
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
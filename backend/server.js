const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());


//MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'authdb',
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

app.use(express.urlencoded({ extended: true }));


// Login endpoint
app.post('/', (req, res) => {
    const { name, password } = req.body;

    if (name === 'admin') {
        // Validate login credentials against the auth table
        const query = `SELECT * FROM authdb.auth WHERE name = '${name}' AND password = '${password}'`;
        db.query(query, [name, password], (err, results) => {
            if (err) console.log(err);

            // if\ (results) {
            // Successful login


            if (results.length >= 1) {
                res.json({
                    success: true,
                    isAdmin: true
                })
            } else {
                res.json({ success: false })
            }
            // } else {
            //     // Invalid credentials
            //     res.json({ success: false, message: 'Invalid credentials' });
            // }
        });

    } else if (name === 'customer1' || name === 'customer2') {
        const query = `SELECT * FROM authdb.auth WHERE name = '${name}' AND password = '${password}'`;
        db.query(query, [name, password], (err, results) => {
            if (err) console.log(err);

            if (results.length >= 1) {
                res.json({
                    success: true,
                    isAdmin: false
                })
            } else {
                res.json({ success: false })
            }

        });
    }
});


// Data submission endpoint
app.post('/user', (req, res) => {
    // const sql = `INSERT INTO customer (date, company, owner, item, quantity, box_count) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.id,
        req.body.date,
        req.body.company,
        req.body.owner,
        req.body.item,
        req.body.quantity,
        req.body.count
    ]
    const sql = `INSERT INTO customer (id,date,company,owner,item,quantity,count) VALUES('${values[0]}','${values[1]}','${values[2]}','${values[3]}','${values[4]}','${values[5]}','${values[6]}')`
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            res.json({
                dataCreated: true
            });
        }
    })
});



// Data retrieval endpoint
app.get('/admin', (req, res) => {
    // Fetch data from the customer table
    const query = `SELECT * FROM customer`;
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
    const { role } = req.query;

    // if (role === 'admin') {
    //     // Fetch data (quantity, box_count) from the customer table
    //     const query = `SELECT quantity, box_count FROM customer`;
    //     connection.query(query, (err, results) => {
    //         if (err) throw err;
    //         res.json(results);
    //     });
    // } else if (role === 'customer1' || role === 'customer2') {
    //     // Fetch all data from the customer table for the respective customer
    //     const query = `SELECT * FROM customer WHERE owner = ?`;
    //     connection.query(query, [role], (err, results) => {
    //         if (err) throw err;
    //         res.json(results);
    //     });
    // }
});


//Start the server
app.listen(8081, () => {
    console.log('listening');
})



// app.get('/', (req, res) => {
//     return res.json("From Backend");
// })

// app.post('/', (req, res) => {
//     const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?"

//     db.query(sql, [req.body.name, req.body.password], (err, data) => {
//         if (err) {
//             return res.json("Error");
//         }
//         if (data.length > 0) {
//             return res.json("Success");
//         } else {
//             return res.json("Failure");
//         }
//     })
// })

const express = require('express');
const bodyParser = require('body-Parser');
// const mongoose = require('mongoose');
const path = require('path');
// import des routes
// const stuffRoutes = require('./routes/post');
// const userRoutes = require('./routes/user');
const helmet = require('helmet')
const app = express();

const mysql = require('mysql');
const db = mysql.createConnection
    ({
        host: 'localhost',
        user: 'root',
        password: 'password1',
        database: 'groupomania4',
    });
// app.get('/', (req, res) => {
//     db.query(
//         "INSERT INTO`users`(`firstname`, `password`, `email`) VALUES('tesggggggggt', 'teggggggggst', 'test@test.com');",


//         (err, results) => {
//             console.log(users);
//             res.send(results);

//         }
//     );
// });

db.connect(function (err) {
    if (err) throw err;
    console.log("db Connected!");
});


app.get('/', function (req, res) {
    res.send("express")
})




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/api/auth', userRoutes);
// app.use('/api/sauces', stuffRoutes);
/*X - XSS - Protection vulnérabilités les plus courantes*/
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'deny' }));
module.exports = app;
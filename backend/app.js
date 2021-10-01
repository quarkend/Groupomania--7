// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const cookieParser = require('cookie-parser');
// const userRoutes = require('./routes/user');

// const cors = require('cors');

// // déclaration de l'application express
// const app = express();


// app.use(cookieParser());
// app.use(cors({
// 	credentials: true,
// 	origin: ['http://localhost:3000'],
// 	allowedHeaders: ['Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'],
// 	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// }))

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const db = require("./models");

// db.sequelize.sync();

// // définition des routes

// app.use("/api/auth", userRoutes);

// module.exports = app;
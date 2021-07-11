const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const userRoute = require('./routes/users');
const userRoute = require('./routes/auth');

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.get("/", (rep, res) => {
//     res.send("Welcome to homepage ");
// });
// app.get("/users", (rep, res) => {
//     res.send("Welcome to user ");
// });
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.listen(8800, () => {
    console.log("backend server is runing");
});
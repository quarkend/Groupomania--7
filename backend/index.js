const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
app.use(express.json());
app.use(cors());

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

const db = require("./models");

// Routers
app.use('/images', express.static(path.join(__dirname, 'images')));
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);




app.use(helmet());
app.use(morgan("common"));
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
// const express = require('express');
// // const bodyParser = require('body-parser');
// // const fs = require('fs');
// // const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const dotenv = require('dotenv');
// dotenv.config();
// const app = express();
// const userRoute = require('./routes/users');
// const authRoute = require('./routes/auth');

// //middleware
// app.use(express.json());

// // app.get("/", (rep, res) => {
// //     res.send("Welcome to homepage ");
// // });
// // app.get("/users", (rep, res) => {
// //     res.send("Welcome to user ");
// // });
// app.use("/api/users", userRoute);
// app.use("/api/auth", authRoute);
// app.listen(8800, () => {
//     console.log("backend server is runing");
// });
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const dateFns = require('date-fns/format');
require('dotenv').config();
app.use(express.json());
app.use(cors());

const db = require("./models");
require('dotenv').config();



const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');
// Routers
// const postRouter = require("./routes/Posts");
// app.use("/posts", postRouter);
// const commentsRouter = require("./routes/Comments");
// app.use("/comments", commentsRouter);
// const usersRouter = require("./routes/Users");
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // const name = file.originalname.replace(/\..+$/, '').split(' ').join('_');
        // const extension = MIME_TYPES[file.mimetype];
        // callback(null, name + Date.now() + '.' + extension);
        callback(null, req.body.name);
    }
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});
module.exports = multer({ storage }).single('image');
// Pour parser
app.use(bodyParser.json());
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use("/auth", usersRouter);
// app.use("/users", usersRouter);



const likesRouter = require("./routes/like");
app.use("/api/likes", likesRouter);
/******************** */
app.use('/images', express.static(path.join(__dirname, 'images')));
/*xhinafi2 s */
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/users', userRoutes);
module.exports = app;

/******************************** */
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});



// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const path = require('path');
// const auth = require('./middlewares/auth');
// require('dotenv').config();

// const app = express();
// const db = require('./models');

// const authRoutes = require('./routes/auth');
// const postRoutes = require('./routes/post');
// const commentRoutes = require('./routes/comment');
// const userRoutes = require('./routes/user');


// // Sécurité du http
// app.use(helmet());

// // CORS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });
// app.use(cors({ origin: "http://localhost:3007", credentials: true }));

// // Utilisation de sequelize
// db.sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection to the database has been established successfully');
//     })
//     .catch(error => {
//         console.log('Unable to connect to the database : ', error);
//     })

// // Pour parser
// app.use(bodyParser.json());

// app.use('/images', express.static(path.join(__dirname, 'images')));
// /*xhinafi2 s */
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/users', userRoutes);
// module.exports = app;
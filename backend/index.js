const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

const app = express();
app.listen(8800, () => {
    console.log("backend server")
})
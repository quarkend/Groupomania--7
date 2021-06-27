const express = require('express');
const app = express();

app.use("/users", require("./routes/users"));


app.get('/', function (req, res) {
    res.send("ya rabe")
}
)

app.listen(3001, function () {
    console.log("Server express Connected 3001");
})
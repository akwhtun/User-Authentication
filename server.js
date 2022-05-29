const express = require("express");
const app = express();

const bodyParser= require("body-parser");

const path = require("path");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname +'/public'));

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/home.pug", function(req, res) {
    res.render("home")
});

app.listen(3000, function () {
    console.log("server running at port 3000");
});

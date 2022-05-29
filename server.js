const express = require("express");
const app = express();

const mongojs = require("mongojs");
const db = mongojs("authenticate", ["users"]);

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

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/home.pug", function(req, res) {
    db.users.insert({name: req.body.name, email: req.body.email, phone: req.body.phone, password: req.body.password}, function(err, data) {
        if(err) {
            return res.status(500);
        }
    })
    return res.redirect("?register=true");
});

app.listen(3000, function () {
    console.log("server running at port 3000");
});

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

app.post("/login", function(req, res) {
    const reqemail = req.body.email;
    const reqpassword = req.body.password;

     const user = db.users.findOne({email: reqemail}, function(err, data){
        if(err) {
            return res.status(500);
        }else if(!data){
            res.redirect("?user=false")
        }else {
            if(reqpassword === data.password){
                res.redirect("?user=true")
            }else {
                res.redirect("?user=false")
            }
    }
    });
});

app.get("/login", Auth, function(req, res){
    res.render("welcome");
});

function Auth(req, res, next) {
    console.log("auth");
    if(req.query.user=== "true") {
        next();
    } 
    else {
        res.render("invalid");
    }
}

app.listen(3000, function () {
    console.log("server running at port 3000");
});

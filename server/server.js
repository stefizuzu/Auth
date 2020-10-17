const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport_setup"); // get the setup

var userData = require("./userData");
const e = require("express");

const app = express();
app.use(cors());

app.use(express.json()); // to be able to grab the information from the frontend
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set cookie-session
app.use(
  cookieSession({
    name: "PD-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

// create database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "stefi2210",
  database: "stefizuzu",
});

// responses
app.get("/", (req, res) => {
  res.send("go to path /connect-google");
});

app.get("/failed", (req, res) => res.send("You failed to log in!"));

app.get("/ok", isLoggedIn, (req, res) =>
  res.send(`Welcome ${req.user.displayName}`)
);

passport.serializeUser(function (user, done) {
  userData.id = user.id;
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.query("select * from PD_Accounts where userId = ?", id, (err, result) => {
    var userFound = result[0];
    if (userFound == "undefined") done(null, null);
    else done(null, id);
  });
});

app.get("/isLogged", (req, res) => {
  if (isLoggedIn) res.send(true);
  res.send(false);
});

app.get("/getUserData", (req, res) => {
  console.log("User tried to log in");
  const query = "select * from PD_Accounts where userID = ?";

  db.query(query, userData.id, (err, result) => {
    if (err) console.log("Error : query failed");

    if (result[0]) {
      userData.email = result[0].email;
      userData.name = result[0].name;
      userData.typeOfUser = result[0].typeOfUser;
      console.log("User logged in");
    }
    res.send(userData);
  });
});

app.get("/getPatientData", (req, res) => {
  const query = "select * from PD_PatientDataAccess where userId =?";
  db.query(query, userData.id, (err, result) => {
    if (err) console.log("Error : query failed");

    if (result) {
      var data = [];
      for (var i = 0; i < result.length; i++) {
        data[i] = result[i];
      }
    }
    res.send(data);
  });
});

app.get(
  "/connect-google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.send("<script>window.close();</script > ");
  }
);

app.get("/connect-facebook", passport.authenticate("facebook"));
app.get("/facebook/callback", passport.authenticate("facebook"), (req, res) => {
  res.send("<script>window.close();</script > ");
});

app.get("/connect-github", passport.authenticate("github"));
app.get("/github/callback", passport.authenticate("github"), (req, res) => {
  res.send("<script>window.close();</script > ");
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logOut();
  userData = {};
  console.log("logged out");
  res.send("<script>window.close();</script > ");
});

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

// npm run devStart
app.listen(3001, () => {
  console.log("Running server! on port 3001");
});

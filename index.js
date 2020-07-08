const express = require("express");
const app = express();

const database = require("./database_vendor");

const bodyparser = require("body-parser");

const port = 3000;
app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static("images"));

var urlencoded = bodyparser.urlencoded({ extended: false });

app.get("/user/registration", (req, res) => {
  res.render("user_registration");
});

app.post("/user/registration", (req, res) => {
  try {
    var data = {
      mobile: req.body.mobile,
      password: req.body.password,
    };
    database.db.collection("user_login").insertOne(data, (err, res) => {
      if (err) throw err;

      console.log("user login detail inserted");
      console.log(res);
    });
    res.render("user_login");
  } catch {
    res.render("user_registration");
  }
});

app.get("/user/login", (req, res) => {
  res.render("user_login");
});

app.post("/user/login", (req, res) => {
  var mobile = req.body.mobile;
  var password = req.body.password;
  database.db
    .collection("user_login")
    .findOne({ mobile: mobile }, (err, result) => {
      if (err) throw err;

      if (result.password == password && result.mobile == mobile) {
        res.render("login_success");
      }
    });
  res.render("user_login");
  console.log("Incorrecct Username/password");
});

app.get("/vendor/login", (req, res) => {
  res.render("vendor");
});

app.post("/vendor/login", urlencoded, (req, res) => {
  var Registrationnumber = req.body.Registrationnumber;
  var password = req.body.password;
  console.log(Registrationnumber);
  var obj = {
    Registrationnumber: Registrationnumber,
    password: password,
  };
  database.db
    .collection("Vendor_Registration")
    .findOne({ Registrationnumber: Registrationnumber }, (err, result) => {
      if (err) throw err;

      if (
        result.Registrationnumber == Registrationnumber &&
        result.password == password
      ) {
        res.render("login_success");
      }
    });
  res.render("user_login");
  console.log("Incorrecct Username/password");
});

app.get("/vendor/registration", (req, res) => {
  res.render("register_vendor");
});

app.post("/vendor/registration", (req, res) => {
  try {
    var data = {
      Companyname: req.body.Companyname,
      Registrationnumber: req.body.Registrationnumber,
      Address: req.body.Address,
      State: req.body.State,
      City: req.body.City,
      Pincode: req.body.Pincode,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
    };

    database.db
      .collection("Vendor_Registration")
      .insertOne(data, (err, result) => {
        if (err) throw err;

        console.log("Record inserted");
        console.log(result);
      });

    res.redirect("login");
  } catch {
    res.render("register_vendor");
  }
});

app.listen(port, () => {
  console.log("app is listening");
});

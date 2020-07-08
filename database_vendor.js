const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/vendor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;

db.once("open", (err) => {
  if (err) throw err;

  console.log("connection established");
});

const user_login = new mongoose.Schema({
  mobile: { type: String, unique: true },
  password: { type: String },
});

const user = mongoose.model("user_login", user_login);

const mySchema = new mongoose.Schema({
  Companyname: { type: String, unique: true },
  Registrationnumber: { type: String, unique: true },
  Address: { type: String },
  State: { type: String },
  City: { type: String },
  Pincode: { type: String },
  email: { type: String, unique: true },
  password: { type: String, unique: true },
  mobile: { type: String, unique: true },
  file: { type: String },
});

const vendor = mongoose.model("Vendor_Registration", mySchema);

module.exports = {
  user,
  vendor,
  db,
};

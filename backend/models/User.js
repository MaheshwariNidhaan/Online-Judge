const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
    required: true,
  },
  lastname: {
    type: String,
    default: null,
    required: true,
  },
  email: {
    type: String,
    default: null,
    required: true,
    unique: true, //email should be unique (email already exists if user tries to register with an email already present in database)
  },
  password: {
    type: String,
    default: null,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema); // singular here...in mongoDB it will show Users

//using this schema it will create a model (basically a table) having users

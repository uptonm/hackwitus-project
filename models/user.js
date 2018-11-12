const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first: String,
  last: String,
  email: String,
  password: String,
  googleId: String
});

const User = mongoose.model("users", userSchema);
module.exports = User;

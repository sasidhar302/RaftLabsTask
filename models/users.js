
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  "username": { type: String},
  "password": { type: String}
});

mongoose.model("users", UserSchema);

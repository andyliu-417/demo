const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, require: true },
  permissions: { type: Array, require: true }
});

module.exports = mongoose.model("User", UserSchema);

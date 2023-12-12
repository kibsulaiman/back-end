const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    name: String,
    age: Number,
    email: String,
    status: String,
    token: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", userSchema);

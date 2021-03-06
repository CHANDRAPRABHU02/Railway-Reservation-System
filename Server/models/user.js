const mongoose = require("mongoose");

const schema = mongoose.schema;

const user = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: Number },
});

const User = mongoose.model("userDB", user);

module.exports = User;

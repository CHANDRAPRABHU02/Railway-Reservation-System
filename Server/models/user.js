const mongoose = require("mongoose");

const schema = mongoose.schema;

const user = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = mongoose.model("userDB", user);

module.exports = User;

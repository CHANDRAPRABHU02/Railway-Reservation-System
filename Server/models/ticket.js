const mongoose = require("mongoose");

const schema = mongoose.schema;

const tickets = new mongoose.Schema({
  uid: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  trainNo: { type: Number, required: true },
  passangersDetail: [{ type: Object }],
  validTill: { type: Date },
});

const TK = mongoose.model("ticketsDB", tickets);

module.exports = TK;

const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, require: true },
  date: { type: Date, require: true },
  url: { type: String, require: true },
  celebrity: { type: String, require: true },
  description: { type: String, require: true }
});

module.exports = mongoose.model("Event", EventSchema);

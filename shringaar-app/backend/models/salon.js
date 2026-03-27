const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema({
  name: String,
  location: String,
  services: Array,
  slots: Array
});

module.exports = mongoose.model("Salon", salonSchema);
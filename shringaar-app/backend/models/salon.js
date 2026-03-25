const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema({
  name: String,
  location: String,
  services: [
    {
      category: String,
      name: String,
      price: Number
    }
  ],
  slots: [String]
});

module.exports = mongoose.model("Salon", salonSchema);
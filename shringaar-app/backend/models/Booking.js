const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userName: String,
  salonId: String,
  service: String,
  date: String,
  time: String
});

module.exports = mongoose.model("Booking", bookingSchema);
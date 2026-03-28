const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Booking = require("../models/Booking");
const Service = require("../models/Service");


// ✅ Get all bookings
router.get("/bookings", auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("serviceId", "name price");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Delete booking
router.delete("/booking/:id", auth, admin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Add new service
router.post("/service", auth, admin, async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Delete service
router.delete("/service/:id", auth, admin, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/test", (req, res) => {
  res.send("Admin route working");
});

module.exports = router;
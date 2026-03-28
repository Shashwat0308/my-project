const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/admin");

const User = require("./models/User");
const Salon = require("./models/Salon");
const Booking = require("./models/Booking");


// OTP store (temporary memory)
const otpStore = {};

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);

/* =========================
   SLOT GENERATOR (9 AM - 6 PM)
========================= */
const generateSlots = () => {
  let slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute of [0, 30]) {
      let h = hour > 12 ? hour - 12 : hour;
      let period = hour < 12 ? "AM" : "PM";
      let hourStr = h.toString().padStart(2, "0");
      let minStr = minute.toString().padStart(2, "0");

      slots.push(`${hourStr}:${minStr} ${period}`);
    }
  }
  return slots;
};

/* =========================
   SERVICES GENERATOR
========================= */
const generateServices = () => [
  { category: "Hair", name: "Hair Spa", price: 800 },
  { category: "Hair", name: "Hair Cutting", price: 300 },
  { category: "Hair", name: "Hair Coloring", price: 1500 },
  { category: "Hair", name: "Keratin Treatment", price: 4000 },

  { category: "Skin", name: "Facial", price: 1200 },
  { category: "Skin", name: "Hydra Facial", price: 3000 },
  { category: "Skin", name: "Chemical Peel", price: 2500 },

  { category: "Wellness", name: "Full Body Massage", price: 2000 },
  { category: "Wellness", name: "Aromatherapy", price: 2200 },
  { category: "Wellness", name: "Yoga Session", price: 800 }
];

/* =========================
   MONGODB CONNECTION
========================= */
mongoose.connect("mongodb://127.0.0.1:27017/beauty");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

/* =========================
   AUTH APIs
========================= */

// Register
app.post("/register", async (req, res) => {
  const { name, phone, email } = req.body;

  const existingUser = await User.findOne({
    $or: [{ phone }, { email }]
  });

  if (existingUser) {
    return res.send({ message: "User already exists ❌" });
  }

  const user = new User({ name, phone, email });
  await user.save();

  res.send({ message: "User registered ✅", user });
});

// Login
app.post("/login", async (req, res) => {
  const { phone, email } = req.body;

  const user = await User.findOne({
    $or: [{ phone }, { email }]
  });

  if (!user) {
    return res.send({ message: "User not found ❌" });
  }

  res.send({ message: "Login successful ✅", user });
});

/* =========================
   OTP APIs
========================= */

// Send OTP
app.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[phone] = otp;

  console.log("OTP for", phone, ":", otp);

  res.send({ message: "OTP sent ✅" });
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
  const { name, phone, email, otp } = req.body;

  if (otpStore[phone] == otp) {
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({ name, phone, email });
      await user.save();
    }

    res.send({ message: "OTP verified ✅", user });
  } else {
    res.send({ message: "Invalid OTP ❌" });
  }
});

/* =========================
   SALON APIs
========================= */

// Get salons
app.get("/salons", async (req, res) => {
  const salons = await Salon.find();

  const updatedSalons = salons.map((salon) => ({
    ...salon.toObject(),
    slots: generateSlots(),
    services: generateServices()
  }));

  res.send(updatedSalons);
});

// Add salon
app.post("/salon", async (req, res) => {
  const salon = new Salon(req.body);
  await salon.save();
  res.send(salon);
});

/* =========================
   BOOKING API
========================= */

app.post("/booking", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();

  res.send({ message: "Booking successful ✅", booking });
});

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("API is running");
});

/* =========================
   SERVER START
========================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
  
  
console.log("Admin routes loaded");
});
const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());



// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/beauty");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// Models
const Salon = require("./models/Salon");
const Booking = require("./models/Booking");


//register api
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

//login api 

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

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Get salons
app.get("/salons", async (req, res) => {
  const salons = await Salon.find();
  res.send(salons);
});

// Add salon
app.post("/salon", async (req, res) => {
  const salon = new Salon(req.body);
  await salon.save();
  res.send(salon);
});

// Booking
app.post("/booking", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.send(booking);
});

app.listen(5000, () => console.log("Server running on port 5000"));
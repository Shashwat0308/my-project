const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//otp based login and registration system
const otpStore = {};

const app = express();
app.use(cors());
app.use(express.json());

const generateSlots = () => {
  let slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute of [0, 30]) {
      let hourStr, period;
      
      if (hour === 9) hourStr = "09";
      else if (hour < 12) hourStr = hour.toString().padStart(2, '0');
      else if (hour === 12) hourStr = "12";
      else hourStr = (hour - 12).toString().padStart(2, '0');
      
      period = hour < 12 ? 'AM' : 'PM';
      const minStr = minute.toString().padStart(2, '0');
      slots.push(`${hourStr}:${minStr} ${period}`);
    }
  }
  return slots;
};

slots: generateSlots()



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


app.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  // Validate Indian phone number
  const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(phone)) {
    return res.status(400).send({ message: "Invalid Indian phone number ❌" });
  }

  // Normalize phone number to +91 format
  let normalizedPhone = phone;
  if (phone.startsWith('91')) {
    normalizedPhone = '+' + phone;
  } else if (!phone.startsWith('+91')) {
    normalizedPhone = '+91' + phone;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[normalizedPhone] = otp;

  // TODO: Integrate with SMS service like Twilio, MSG91, etc.
  // For now, logging to console
  console.log("OTP for", normalizedPhone, "is:", otp); // 👈 IMPORTANT

  // Example integration with Twilio (uncomment and add credentials)
  // const twilio = require('twilio');
  // const client = twilio('your_account_sid', 'your_auth_token');
  // client.messages.create({
  //   body: `Your OTP is: ${otp}`,
  //   from: '+1234567890', // Your Twilio number
  //   to: normalizedPhone
  // }).then(message => console.log(message.sid));

  res.send({ message: "OTP sent to your mobile ✅" });
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  // Normalize phone number
  let normalizedPhone = phone;
  if (phone.startsWith('91')) {
    normalizedPhone = '+' + phone;
  } else if (!phone.startsWith('+91')) {
    normalizedPhone = '+91' + phone;
  }

  if (otpStore[normalizedPhone] == otp) {
    // Find or create user
    // Assuming we have the user details from previous registration
    // For simplicity, just verify
    res.send({ message: "OTP verified ✅", user: { phone: normalizedPhone } });
  } else {
    res.send({ message: "Invalid OTP ❌" });
  }
});



// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Get salons
app.get("/salons", async (req, res) => {
  const salons = await Salon.find();
  
  // Update all salons with new slots
  const updatedSalons = salons.map(salon => {
    return {
      ...salon.toObject(),
      slots: generateSlots()
    };
  });
  
  res.send(updatedSalons);
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
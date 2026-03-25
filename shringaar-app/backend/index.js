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

const generateServices = () => {
  return [
    // HAIR SERVICES
    { category: "Hair", name: "Hair Treatments", price: 1500 },
    { category: "Hair", name: "Hair Spa & Deep Conditioning", price: 2000 },
    { category: "Hair", name: "Keratin Treatment", price: 3500 },
    { category: "Hair", name: "Hair Smoothening", price: 3000 },
    { category: "Hair", name: "Hair Coloring", price: 2500 },
    { category: "Hair", name: "Highlighting & Balayage", price: 4000 },
    { category: "Hair", name: "Hair Straightening", price: 2800 },
    { category: "Hair", name: "Hair Perming", price: 3200 },
    { category: "Hair", name: "Scalp Treatment & Massage", price: 1200 },
    { category: "Hair", name: "Hot Oil Treatment", price: 1800 },
    { category: "Hair", name: "Anti-Dandruff Treatment", price: 1600 },
    { category: "Hair", name: "Hair Styling", price: 800 },
    { category: "Hair", name: "Bridal Makeup & Hair", price: 5000 },
    { category: "Hair", name: "Party Makeup & Hair", price: 3500 },
    { category: "Hair", name: "Daily Styling", price: 600 },
    { category: "Hair", name: "Hair Cutting & Styling", price: 1000 },
    { category: "Hair", name: "Bridal Makeup Trial", price: 2000 },
    { category: "Hair", name: "Hair Extensions (Clip-in, Tape-in, Sew-in)", price: 2500 },
    { category: "Hair", name: "Hair Transplant Consultation", price: 500 },
    { category: "Hair", name: "Hair Removal", price: 800 },
    { category: "Hair", name: "Permanent Hair Removal", price: 1500 },
    { category: "Hair", name: "Laser Hair Removal", price: 2000 },
    { category: "Hair", name: "Waxing", price: 500 },
    { category: "Hair", name: "Threading", price: 200 },
    { category: "Hair", name: "Bleaching", price: 600 },
    { category: "Hair", name: "Hair Removal Cream", price: 300 },

    // SKIN SERVICES
    { category: "Skin", name: "Basic Facial", price: 1200 },
    { category: "Skin", name: "Anti-Aging Facial", price: 2500 },
    { category: "Skin", name: "Acne Treatment Facial", price: 1800 },
    { category: "Skin", name: "Brightening Facial", price: 2000 },
    { category: "Skin", name: "De-Tan Facial", price: 1600 },
    { category: "Skin", name: "HydraFacial", price: 3500 },
    { category: "Skin", name: "Chemical Peel", price: 2800 },
    { category: "Skin", name: "Microdermabrasion", price: 3000 },
    { category: "Skin", name: "Oxygen Facial", price: 2200 },
    { category: "Skin", name: "Glow Facial", price: 1900 },
    { category: "Skin", name: "Laser Hair Removal", price: 2000 },
    { category: "Skin", name: "Laser Skin Resurfacing", price: 5000 },
    { category: "Skin", name: "Laser Toning", price: 4000 },
    { category: "Skin", name: "Laser Pore Reduction", price: 3500 },
    { category: "Skin", name: "Botox Treatment", price: 8000 },
    { category: "Skin", name: "Dermal Fillers", price: 12000 },
    { category: "Skin", name: "Under Eye Fillers", price: 7000 },
    { category: "Skin", name: "Thread Lift", price: 15000 },
    { category: "Skin", name: "Suture Lift", price: 18000 },
    { category: "Skin", name: "Radio Frequency Treatment", price: 3000 },
    { category: "Skin", name: "RF Skin Tightening", price: 4000 },
    { category: "Skin", name: "RF Body Sculpting", price: 5000 },
    { category: "Skin", name: "RF Face Lifting", price: 4500 },
    { category: "Skin", name: "Body Scrub", price: 1500 },
    { category: "Skin", name: "Body Wrap", price: 2000 },
    { category: "Skin", name: "Detox Body Wrap", price: 2500 },
    { category: "Skin", name: "Anti-Cellulite Wrap", price: 3000 },
    { category: "Skin", name: "Swedish Massage", price: 1800 },
    { category: "Skin", name: "Aromatherapy Massage", price: 2200 },
    { category: "Skin", name: "Hot Stone Massage", price: 2800 },
    { category: "Skin", name: "Thai Massage", price: 2500 },
    { category: "Skin", name: "Deep Tissue Massage", price: 2400 },
    { category: "Skin", name: "Full Body Bleaching", price: 1200 },
    { category: "Skin", name: "Body Shaping", price: 3500 },
    { category: "Skin", name: "Weight Loss Treatment", price: 4000 },
    { category: "Skin", name: "Anti-Aging Body Treatment", price: 3200 },
    { category: "Skin", name: "Face Waxing", price: 400 },
    { category: "Skin", name: "Underarms Waxing", price: 300 },
    { category: "Skin", name: "Leg Waxing (Full)", price: 800 },
    { category: "Skin", name: "Armpit + Legs Waxing", price: 1000 },

    // WELLNESS SERVICES
    { category: "Wellness", name: "Swedish Massage Therapy", price: 1800 },
    { category: "Wellness", name: "Aromatherapy Massage Therapy", price: 2200 },
    { category: "Wellness", name: "Hot Stone Massage Therapy", price: 2800 },
    { category: "Wellness", name: "Deep Tissue Massage Therapy", price: 2400 },
    { category: "Wellness", name: "Stress Relief Package", price: 3500 },
    { category: "Wellness", name: "Weekend Relaxation Package", price: 4200 },
    { category: "Wellness", name: "Corporate Wellness Package", price: 5000 },
    { category: "Wellness", name: "Hatha Yoga", price: 800 },
    { category: "Wellness", name: "Power Yoga", price: 1000 },
    { category: "Wellness", name: "Meditation Class", price: 600 },
    { category: "Wellness", name: "Pranayama Session", price: 700 },
    { category: "Wellness", name: "Foot Reflexology", price: 1200 },
    { category: "Wellness", name: "Hand Reflexology", price: 1000 },
    { category: "Wellness", name: "Full Body Reflexology", price: 2000 },
    { category: "Wellness", name: "Basic Diet Plan", price: 1500 },
    { category: "Wellness", name: "Weight Loss Diet Plan", price: 2500 },
    { category: "Wellness", name: "Skin Diet Plan", price: 1800 },
    { category: "Wellness", name: "Hair Health Diet Plan", price: 1600 },
    { category: "Wellness", name: "Juice Detox", price: 2000 },
    { category: "Wellness", name: "Herbal Detox", price: 2200 },
    { category: "Wellness", name: "Lifestyle Detox", price: 3000 },
    { category: "Wellness", name: "Beauty + Wellness Package", price: 4500 },
    { category: "Wellness", name: "Stress Relief + Beauty Treatment", price: 3800 },
    { category: "Wellness", name: "Complete Beauty Wellness Package", price: 6000 },
    { category: "Wellness", name: "Summer Cool Down", price: 2800 },
    { category: "Wellness", name: "Winter Glow", price: 3200 },
    { category: "Wellness", name: "Monsoon Wellness", price: 2600 },
    { category: "Wellness", name: "Spring Refresh", price: 2900 },
    { category: "Wellness", name: "Joint Pain Relief", price: 1800 },
    { category: "Wellness", name: "Back Pain Therapy", price: 2000 },
    { category: "Wellness", name: "Muscle Pain Treatment", price: 1900 },
    { category: "Wellness", name: "Sleep Therapy", price: 1600 },
    { category: "Wellness", name: "Aromatherapy for Sleep", price: 1400 },
    { category: "Wellness", name: "Stress-Free Sleep Package", price: 2500 }
  ];
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
  console.log("� SEND-OTP ROUTE HIT!");
  console.log("�📱 Send OTP request received:", req.body);

  const { phone } = req.body;

  // Validate Indian phone number
  const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  console.log("🔍 Phone validation for:", phone, "Regex match:", indianPhoneRegex.test(phone));

  if (!indianPhoneRegex.test(phone)) {
    console.log("❌ Invalid phone number:", phone);
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

  // Debug logs
  console.log("✅ OTP GENERATED for", normalizedPhone, "is:", otp); // 👈 IMPORTANT
  console.log("🔐 otpStore now:", otpStore);

  // TODO: Integrate with SMS service like Twilio, MSG91, etc.
  // For now, logging to console

  // Example integration with Twilio (uncomment and add credentials)
  // const twilio = require('twilio');
  // const client = twilio('your_account_sid', 'your_auth_token');
  // client.messages.create({
  //   body: `Your OTP is: ${otp}`,
  //   from: '+1234567890', // Your Twilio number
  //   to: normalizedPhone
  // }).then(message => console.log(message.sid));

  res.send({ message: "OTP sent to your mobile ✅", otp }); // Dev-only: helps verify front-end flow + debug
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
  const { name, phone, email, otp } = req.body;

  // Normalize phone number
  let normalizedPhone = phone;
  if (phone.startsWith('91')) {
    normalizedPhone = '+' + phone;
  } else if (!phone.startsWith('+91')) {
    normalizedPhone = '+91' + phone;
  }

  if (otpStore[normalizedPhone] == otp) {
    // Find or create user
    let user = await User.findOne({ phone: normalizedPhone });
    if (!user) {
      user = new User({ name, phone: normalizedPhone, email });
      await user.save();
    }
    
    res.send({ message: "OTP verified and user registered ✅", user });
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
  
  // Update all salons with new slots and services
  const updatedSalons = salons.map(salon => {
    return {
      ...salon.toObject(),
      slots: generateSlots(),
      services: generateServices()
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
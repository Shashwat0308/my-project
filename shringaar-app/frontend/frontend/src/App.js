import './App.css';
import { useEffect, useState } from "react";

function App() {
  // States
  const [salons, setSalons] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [user, setUser] = useState(null);
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");

  // Fetch salons from backend
  useEffect(() => {
     const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUser(JSON.parse(savedUser));}
    fetch("http://localhost:5000/salons")
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

// Register function
const register = async () => {
  const res = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, phone, email })
  });

  const data = await res.json();
  alert(data.message);
};

// Login function
const login = async () => {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone, email })
  });

  const data = await res.json();
  alert(data.message);

  if (data.user) {
   setUser(data.user);
localStorage.setItem("user", JSON.stringify(data.user));
  }
};

// Booking function
const book = async (salonId) => {
  if (!selectedService || !selectedTime) {
    alert("Please select service and time ❗");
    return;
  }

  const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user?.name,
        salonId: salonId,
        service: selectedService,
        date: "2026-03-25",
        time: selectedTime,
      }),
    });

    const data = await res.json();
    alert(data.message || "Booking Done ✅");

    // Reset selection after booking
    setSelectedService("");
    setSelectedTime("");
  };


  const sendOtp = async () => {
  await fetch("http://localhost:5000/send-otp", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ phone })
  });

  alert("OTP sent (check backend console)");
};

const verifyOtp = async () => {
  const res = await fetch("http://localhost:5000/verify-otp", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ phone, otp })
  });

  const data = await res.json();
  alert(data.message);
};

return (
  <div>

    {/* 🔐 LOGIN + OTP */}
    {!user && (
      <div className="auth-box">
        <h2>Login / Register</h2>

        {/* Name (for register) */}
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        /><br />

        {/* Phone */}
        <input
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        /><br />

        {/* Email */}
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        {/* OTP SECTION */}
        <button onClick={sendOtp}>Send OTP</button><br /><br />

        <input
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        /><br />

        <button onClick={verifyOtp}>Verify OTP</button><br /><br />

        {/* Normal Auth */}
        <button onClick={register}>Register</button>
        <button onClick={login} style={{ marginLeft: "10px" }}>
          Login
        </button>
      </div>
    )}

    {/* 👋 USER + LOGOUT */}
    {user && (
      <div style={{ textAlign: "center" }}>
        <h2>Welcome {user.name} 👋</h2>
        <button onClick={() => {
          setUser(null);
          localStorage.removeItem("user");
        }}>
          Logout
        </button>
      </div>
    )}

    {user && (
  <div style={{ textAlign: "center", margin: "20px" }}>
    <h3>Your Preferences</h3>

    <select>
      <option>Hair</option>
      <option>Skin</option>
      <option>Wellness</option>
    </select>

    <select style={{ marginLeft: "10px" }}>
      <option>Low Budget</option>
      <option>Medium</option>
      <option>Premium</option>
    </select>
  </div>
)}

    {/* 💇 SALONS */}
    {user && (
  <div className="container">
      {salons.map((salon) => (
        <div key={salon._id} className="salon-card">
          <h3>{salon.name}</h3>
          <p>{salon.location}</p>

          <h4>Select Service:</h4>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">--Select Service--</option>
            {salon.services.map((s, i) => (
              <option key={i} value={s.name}>
                {s.name} - ₹{s.price}
              </option>
            ))}
          </select>

          <h4>Select Time:</h4>
          <div>
            {salon.slots.map((slot, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(slot)}
                style={{
                  backgroundColor:
                    selectedTime === slot ? "#4caf50" : "#ff4081",
                }}
              >
                {slot}
              </button>
            ))}
          </div>

        <button onClick={() => book(salon._id)}>
          Book Appointment
        </button>
      </div>
    ))}
  </div>
  )}
</div>
  
  
);
}

export default App;
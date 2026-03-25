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
  const [currentPage, setCurrentPage] = useState("home"); // "home", "login"
  const [selectedCategory, setSelectedCategory] = useState("Hair");

  // Fetch salons from backend
  useEffect(() => {
     const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUser(JSON.parse(savedUser));}
    fetch("http://localhost:5000/salons")
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  // Reset selected service when category changes
  useEffect(() => {
    setSelectedService("");
  }, [selectedCategory]);

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
  const normalizedPhone = phone.trim();
  const res = await fetch("http://localhost:5000/send-otp", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ phone: normalizedPhone })
  });

  const data = await res.json();
  if (res.ok) {
    alert(`OTP sent ✅ (backend console + dev response: ${data.otp})`);
  } else {
    alert(`OTP send failed: ${data.message}`);
  }
};

const verifyOtp = async () => {
  const normalizedPhone = phone.trim();
  const normalizedOtp = otp.trim();

  const res = await fetch("http://localhost:5000/verify-otp", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, phone: normalizedPhone, email, otp: normalizedOtp })
  });

  const data = await res.json();
  alert(data.message);

  if (data.user) {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

return (
  <div>
    {/* HOME PAGE */}
    {currentPage === "home" && !user && (
      <div className="home-page">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to Shringaar Beauty Salon</h1>
          <p className="welcome-subtitle">Book your beauty appointments with ease</p>
          <button className="login-btn" onClick={() => setCurrentPage("login")}>
            Login
          </button>
        </div>
      </div>
    )}

    {/* LOGIN PAGE */}
    {currentPage === "login" && !user && (
      <div className="login-page">
        <div className="login-header">
          <button className="back-btn" onClick={() => setCurrentPage("home")}>
            ← Back to Home
          </button>
          <h2>Login to Your Account</h2>
        </div>

        <div className="login-section">
          <div className="login-box">
            <h3>Login</h3>
            <input
              placeholder="Phone (e.g., +919876543210 or 9876543210)"
              onChange={(e) => setPhone(e.target.value)}
            /><br />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            /><br />
            <button onClick={login}>Login</button>
          </div>
        </div>

        <div className="register-section">
          <div className="register-box">
            <h3>Register New Account</h3>
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            /><br />
            <input
              placeholder="Phone (e.g., +919876543210 or 9876543210)"
              onChange={(e) => setPhone(e.target.value)}
            /><br />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            /><br />

            {/* OTP SECTION - Within Register */}
            <div className="otp-section">
              <button onClick={sendOtp}>Send OTP</button><br /><br />
              <input
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              /><br />
              <button onClick={verifyOtp}>Verify OTP & Register</button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* 👋 USER + LOGOUT */}
    {user && (
      <div className="logout-container">
        <div style={{ textAlign: "center", paddingTop: "10px" }}>
          <h2>Welcome {user.name} 👋</h2>
        </div>
      </div>
    )}

    {/* MAIN CONTENT */}
    {user && (
      <div className="main-content">
        <div className="preferences" style={{ textAlign: "center", margin: "20px" }}>
          <h3 className="preferences-title">Your Preferences</h3>

          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="Hair">💇‍♀️ Hair Services</option>
            <option value="Skin">💆‍♀️ Skin Services</option>
            <option value="Wellness">🧘‍♀️ Wellness Services</option>
          </select>
        </div>

        {/* 💇 SALONS */}
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
                {salon.services
                  .filter(s => s.category === selectedCategory)
                  .map((s, i) => (
                    <option key={i} value={s.name}>
                      {s.name} - ₹{s.price}
                    </option>
                  ))}
              </select>

              <h4>Select Time:</h4>
              <div className="time-slots-container">
                {salon.slots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(slot)}
                    className={`time-slot-button ${selectedTime === slot ? "selected" : ""}`}
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
      </div>
    )}

    {/* LOGOUT BUTTON - BOTTOM FIXED */}
    {user && (
      <button 
        className="logout-button"
        onClick={() => {
          setUser(null);
          localStorage.removeItem("user");
        }}
      >
        🚪 Logout
      </button>
    )}
</div>
  );
}

export default App;
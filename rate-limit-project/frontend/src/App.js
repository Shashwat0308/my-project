import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const [remaining, setRemaining] = useState(null);
  const [limit, setLimit] = useState(null);

  const [requestCount, setRequestCount] = useState(0);
  const [blocked, setBlocked] = useState(0);

  // 🎨 Card Style
  const cardStyle = {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "150px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9"
  };

  // 🔐 LOGIN
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: "user1",
        password: "password123",
      });

      setToken(res.data.token);
      setMessage("Login successful ✅");
    } catch (err) {
      console.error(err.response || err);
      setMessage("Login failed ❌");
    }
  };

  // 🌐 PUBLIC API
  const callPublic = async () => {
    setHistory(prev => [...prev.slice(-9), prev.length + 1]);
    setHistory(prev => [...prev, {
  time: new Date().toLocaleTimeString(),
  type: "success"
}]);
    try {
      const res = await axios.get("http://localhost:5000/api/public");
      console.log("HEADERS:", res.headers);

      setMessage(res.data.message);

      setRemaining(res.headers["x-ratelimit-remaining"]);
      setLimit(res.headers["x-ratelimit-limit"]);

      setRequestCount(prev => prev + 1);

    } catch (err) {
  setBlocked(prev => prev + 1);

  // 👇 ADD THIS (STEP 2)
  setHistory(prev => [...prev, {
    time: new Date().toLocaleTimeString(),
    type: "blocked"
  }]);

  setMessage("Rate limited ❌");
}
  };

  // 🔒 PROTECTED API
  const callProtected = async () => {
   setHistory(prev => [...prev, {
  time: new Date().toLocaleTimeString(),
  type: "success"
}]);
setHistory(prev => [...prev, {
  time: new Date().toLocaleTimeString(),
  type: "success"
}]);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/protected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);

      setRemaining(res.headers["x-ratelimit-remaining"]);
      setLimit(res.headers["x-ratelimit-limit"]);

      setRequestCount(prev => prev + 1);

    } catch (err) {
  setBlocked(prev => prev + 1);

  // 👇 ADD THIS (STEP 2)
  setHistory(prev => [...prev, {
    time: new Date().toLocaleTimeString(),
    type: "blocked"
  }]);

  setMessage("Unauthorized / Rate limited ❌");
}
  };

  const [history, setHistory] = useState([]);

 const chartData = {
  labels: history.map(item => item.time),

  datasets: [
    {
      label: "Successful Requests ✅",
      data: history.map(item => item.type === "success" ? 1 : 0),
      borderColor: "green",
      tension: 0.3
    },
    {
      label: "Blocked Requests ❌",
      data: history.map(item => item.type === "blocked" ? 1 : 0),
      borderColor: "red",
      tension: 0.3
    }
  ]
};


const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        stepSize: 1,
        callback: (val) => val === 1 ? "Request" : ""
      }
    }
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>🚀 Rate Limiting Dashboard</h1>

      <Line data={chartData} options={options} />

      {/* 🔥 DASHBOARD CARDS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px" }}>

      <div style={{ width: "60%", margin: "auto", marginTop: "30px" }}>
  <h3>📊 API Request Graph</h3>
  <Line data={chartData} />
</div>

        <div style={cardStyle}>
          <h3>Remaining</h3>
          <p>{remaining ?? "-"}</p>
        </div>

        <div style={cardStyle}>
          <h3>Limit</h3>
          <p>{limit ?? "-"}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Requests</h3>
          <p>{requestCount}</p>
        </div>

        <div style={cardStyle}>
          <h3>Blocked</h3>
          <p>{blocked}</p>
        </div>

      </div>

      {/* 🔘 BUTTONS */}
      <button onClick={login}>Login</button>
      <br /><br />

      <button onClick={callPublic}>Public API</button>
      <br /><br />

      <button onClick={callProtected}>Protected API</button>

      {/* 📢 MESSAGE */}
      <h2>{message || "No action yet"}</h2>

      <p>{token ? "Token received ✅" : "No token yet"}</p>
    </div>
  );
}

export default App;
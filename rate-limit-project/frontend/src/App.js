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

  const [history, setHistory] = useState([]);

  // LOGIN
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: "user1",
        password: "password123",
      });

      setToken(res.data.token);
      setMessage("Login successful ✅");
    } catch {
      setMessage("Login failed ❌");
    }
  };

  // PUBLIC API
  const callPublic = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/public");

      setMessage(res.data.message);
      setRemaining(res.headers["x-ratelimit-remaining"]);
      setLimit(res.headers["x-ratelimit-limit"]);

      setRequestCount(prev => prev + 1);

      setHistory(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: "success"
      }]);

    } catch {
      setBlocked(prev => prev + 1);

      setHistory(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: "blocked"
      }]);

      setMessage("Rate limited ❌");
    }
  };

  // PROTECTED API
  const callProtected = async () => {
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

      setHistory(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: "success"
      }]);

    } catch {
      setBlocked(prev => prev + 1);

      setHistory(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: "blocked"
      }]);

      setMessage("Unauthorized / Rate limited ❌");
    }
  };

  // GRAPH DATA
  const chartData = {
    labels: history.map(item => item.time),
    datasets: [
      {
        label: "Success ✅",
        data: history.map(item => item.type === "success" ? 1 : 0),
        borderColor: "green"
      },
      {
        label: "Blocked ❌",
        data: history.map(item => item.type === "blocked" ? 1 : 0),
        borderColor: "red"
      }
    ]
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🚀 Rate Limiting Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px" }}>
        <div><h3>Remaining</h3><p>{remaining ?? "-"}</p></div>
        <div><h3>Limit</h3><p>{limit ?? "-"}</p></div>
        <div><h3>Requests</h3><p>{requestCount}</p></div>
        <div><h3>Blocked</h3><p>{blocked}</p></div>
      </div>

      <div style={{ width: "60%", margin: "auto" }}>
        <Line data={chartData} />
      </div>

      <br />

      <button onClick={login}>Login</button>
      <button onClick={callPublic}>Public API</button>
      <button onClick={callProtected}>Protected API</button>

      <h2>{message}</h2>
    </div>
  );
}

export default App;
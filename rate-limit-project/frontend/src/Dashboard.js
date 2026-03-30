import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5000/analytics")
      .then(res => res.json())
      .then(setData);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const sendRequest = (userId) => {
    fetch("http://localhost:5000/api/public", {
      headers: { "user-id": userId }
    })
      .then(res => res.json())
      .then(() => fetchData());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>API Dashboard</h2>

      {/* Buttons */}
      <div>
        {["user1","user2","user3","user4","user5"].map(u => (
          <button key={u} onClick={() => sendRequest(u)}>
            {u}
          </button>
        ))}
      </div>

      {/* USERS */}
      {data.map(user => {
       const chartData = (user.timestamps || [])
  .slice(-20) // 🔥 only last 20 points
  .map((t, i) => ({
    time: i + 1,
    value: i + 1
  }));

        return (
          <div key={user.userId} style={{ margin: "10px", padding: "10px", border: "1px solid gray" }}>
            <h3>{user.userId}</h3>
            <p>Total: {user.total}</p>
            <p>Blocked: {user.blocked}</p>

           <LineChart width={400} height={250} data={chartData}>
  <XAxis dataKey="time" />
  <YAxis domain={[0, 'auto']} />
  <Line 
    type="monotone" 
    dataKey="value" 
    stroke="#ff0000"
    strokeWidth={3}
    dot={false}
  />
</LineChart>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
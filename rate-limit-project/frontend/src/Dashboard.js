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
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>API Dashboard</h2>

      {data.map(user => {
  const chartData = (user.timestamps || []).map((t, i) => ({
    time: i,
    value: 1
  }));

  return (
    <div key={user.userId} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{user.userId}</h3>
      <p>Total: {user.total}</p>
      <p>Blocked: {user.blocked}</p>

      <LineChart width={300} height={200} data={chartData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </div>
  );
})}
    </div>
  );
}

export default Dashboard;
import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')  // Fetch data from backend API
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        users.map(user => (
          <p key={user.id}>{user.name}</p>
        ))
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required!');
    } else {
      setError('');
      console.log('Username:', username);
      console.log('Password:', password);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '2rem auto' }}>
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
    </form>
  );
}

export default LoginForm;

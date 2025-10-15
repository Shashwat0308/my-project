import React, { useState, useEffect } from 'react';
import socket from './socket';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => socket.off('chat message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && name.trim()) {
      socket.emit('chat message', `${name}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Realtime Chat App</h1>

      {!name && (
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;

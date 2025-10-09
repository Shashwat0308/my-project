const express = require('express');
const app = express();

// ---------- Middleware 1: Logging ----------
const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// ---------- Middleware 2: Bearer Token Authentication ----------
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

  if (token !== 'mysecrettoken') {
    return res.status(403).json({ error: 'Invalid or missing token' });
  }

  next(); // Token is valid → allow access
};

// Apply logging middleware globally
app.use(loggerMiddleware);

// ---------- Public Route ----------
app.get('/public', (req, res) => {
  res.json({ message: 'Welcome to the public route — no token required!' });
});

// ---------- Protected Route ----------
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted — you have a valid Bearer token!' });
});

// ---------- Server ----------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

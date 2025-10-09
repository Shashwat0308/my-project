const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// ---------- Hardcoded User ----------
const user = {
  username: 'user1',
  password: 'password123', // Hardcoded for exercise
  balance: 1000
};

// ---------- JWT Secret ----------
const JWT_SECRET = 'mybanksecretkey';

// ---------- Middleware: JWT Verification ----------
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, userData) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = userData; // Attach decoded info
    next();
  });
};

// ---------- Login Route ----------
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    // Generate JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid username or password' });
});

// ---------- Protected Route: View Balance ----------
app.get('/balance', authenticateJWT, (req, res) => {
  res.json({ balance: user.balance });
});

// ---------- Protected Route: Deposit Money ----------
app.post('/deposit', authenticateJWT, (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid deposit amount' });
  }
  user.balance += amount;
  res.json({ message: `Deposited $${amount}`, balance: user.balance });
});

// ---------- Protected Route: Withdraw Money ----------
app.post('/withdraw', authenticateJWT, (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid withdrawal amount' });
  }
  if (amount > user.balance) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }
  user.balance -= amount;
  res.json({ message: `Withdrew $${amount}`, balance: user.balance });
});

// ---------- Start Server ----------
const PORT = 3000;
app.listen(PORT, () => console.log(`Bank API running on http://localhost:${PORT}`));

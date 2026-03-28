const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey"); // same key used in login
    req.user = decoded; // attach user data
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
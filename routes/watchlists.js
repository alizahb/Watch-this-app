// server/routes/watchlists.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Add a new watchlist
router.post('/', verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const user = await User.findById(req.user.id);
  user.watchlists.push({ title, description, movies: [] });
  await user.save();
  res.status(201).json(user.watchlists);
});

// Other CRUD operations for watchlists and movies...

module.exports = router;
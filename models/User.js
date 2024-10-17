const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlists: [{
    title: String,
    description: String,
    movies: [String]
  }]
});

module.exports = mongoose.model('User ', userSchema);
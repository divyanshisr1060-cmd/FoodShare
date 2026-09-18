// User model
// TODO: Implement in Stage 2

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['donor', 'ngo', 'volunteer'], required: true },
  organization: { type: String },
  phone: { type: String },
  address: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


// backend/models/Lead.js
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, index: true },
  token: { type: String, default: '' },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Lead', LeadSchema);

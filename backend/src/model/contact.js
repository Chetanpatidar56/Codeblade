const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  category: { type: String, default: 'General Inquiry' },
  status: { type: String, default: 'New' },
  ipAddress: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

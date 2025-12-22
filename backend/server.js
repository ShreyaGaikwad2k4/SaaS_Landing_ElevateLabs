 
// backend/server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');

const Lead = require('./models/Lead');

const app = express();

/* --- Middleware --- */
app.use(cors());
app.use(express.json());

/* --- Serve frontend static files --- */
/* Assumes frontend lives in ../frontend relative to backend folder */
app.use(express.static(path.join(__dirname, '..', 'frontend')));

/* --- Validate .env values early --- */
const { MONGO_URI, EMAIL_USER, EMAIL_PASS, PORT = 3000, BASE_URL } = process.env;

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI is missing in .env');
  process.exit(1);
}
if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('ERROR: EMAIL_USER or EMAIL_PASS missing in .env');
  process.exit(1);
}

/* --- Connect MongoDB --- */
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

/* --- Nodemailer transporter (Gmail with App Password) --- */
/*EMAIL_USER should be full gmail address; EMAIL_PASS = 16-char app password */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

/* --- Helper: build base URL --- */
function getBaseUrl() {
  // prefer explicit BASE_URL; otherwise fall back to localhost with PORT
  return (BASE_URL && BASE_URL.replace(/\/$/, '')) || `http://localhost:${PORT}`;
}

/* --- API: Signup (store lead, generate token, send verification email) --- */
app.post('/api/signup', async (req, res) => {
  console.log('POST /api/signup hit:', req.body);
  try {
    const { name, email } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

    const normalizedEmail = String(email).trim().toLowerCase();

    // create or update lead
    let lead = await Lead.findOne({ email: normalizedEmail });

    const token = crypto.randomBytes(20).toString('hex');

    if (!lead) {
      lead = new Lead({ name: name.trim(), email: normalizedEmail, token, verified: false });
    } else {
      lead.name = name.trim();
      lead.token = token;
      lead.verified = false;
      lead.createdAt = Date.now();
    }

    await lead.save();

    // verification URL
    const verifyUrl = `${getBaseUrl()}/verify?token=${token}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: normalizedEmail,
      subject: 'Confirm your ElevateDev email',
      html: `
        <p>Hi ${lead.name},</p>
        <p>Thanks for signing up for ElevateDev. Click the link below to verify your email:</p>
        <p><a href="${verifyUrl}">Verify email</a></p>
        <p>If the link doesn't work, copy-paste this URL into your browser:</p>
        <p>${verifyUrl}</p>
        <br/><p>— ElevateDev Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: 'Verification email sent. Please check your inbox.' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/* --- Verify token route (clicked from email) --- */
app.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send('Invalid token');

    const lead = await Lead.findOne({ token });
    if (!lead) return res.status(400).send('Invalid or expired token');

    lead.verified = true;
    lead.token = '';
    await lead.save();

    // redirect to frontend thankyou page with optional name param
    const nameParam = encodeURIComponent(lead.name || '');
    return res.redirect(`/thankyou.html?name=${nameParam}`);
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).send('Server error');
  }
});

/* --- Fallback: serve index.html for unknown routes (helps SPA/front routing) --- */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

/* --- Start server --- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


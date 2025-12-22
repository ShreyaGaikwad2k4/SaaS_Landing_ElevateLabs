const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newUser = new User({
      name,
      email,
      message
    });

    await newUser.save();

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;

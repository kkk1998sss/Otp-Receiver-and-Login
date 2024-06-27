const express = require("express");
const router = express.Router();
const otpStore = {};

// Route to request OTP
router.post("/request-otp", async (req, res) => {
  const { number } = req.body;
  try {
    if (!number) {
      return res.status(400).json({ message: "Invalid phone number" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    otpStore[number] = otp;
    console.log("number and otp", number, otp);
    res.status(200).json({ message: "Otp successfully sent" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to verify OTP
router.post("/verify-otp", async (req, res) => {
  const { number, otp } = req.body;
  console.log(typeof otp);
  try {
    if (!number || !otp) {
      return res.status(400).json({ error: "Number and OTP are required" });
    }
    if (otpStore[number] && otpStore[number] === parseInt(otp)) {
      delete otpStore[number]; // Clear the OTP after successful verification
      return res.status(200).json({ message: "Otp verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

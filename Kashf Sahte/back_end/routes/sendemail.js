const express = require("express");
const sendEmail = require("../mailer"); // Adjust the path accordingly

const router = express.Router();

router.post("/", async (req, res) => {
  const { to, text, image } = req.body;

  try {
    await sendEmail(to, text, image);
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;

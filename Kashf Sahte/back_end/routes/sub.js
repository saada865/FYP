const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// Endpoint to update the subscription status
router.post("/", async (req, res) => {
  console.log("INSIDE SUB BACKJEND");
  const { email, subscribed } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { subscribed },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Subscription status updated successfully" });
  } catch (error) {
    console.error("Error updating subscription status:", error);
    res.status(500).json({
      message: "An error occurred while updating subscription status",
    });
  }
});

module.exports = router;

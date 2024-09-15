const express = require("express");
const router = express.Router();
const { User } = require("../models/user.js");

router.get("/:email", async (req, res) => {
  const userEmail = req.params.email;

  console.log("UPDATE FROM INSIDE THE SUBSCHECK BACKEND 1");

  try {
    console.log("UPDATE FROM INSIDE THE SUBSCHECK BACKEND 6");
    const user = await User.findOne({ email: userEmail });
    console.log("User found:", user);

    console.log("UPDATE FROM INSIDE THE SUBSCHECK BACKEND 7");
    if (!user) {
      console.log("UPDATE FROM INSIDE THE SUBSCHECK BACKEND 2");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("UPDATE FROM INSIDE THE SUBSCHECK BACKEND 3");
    const isSubscribed = user.subscribed || false;
    console.log("UPDATE FROM INSIDE THE SUBSCHECK BACKEND 4");
    res.json({ subscribed: isSubscribed });
  } catch (error) {
    console.log("UPDATE FROM INSIDE THE SUBSCHECK BACKEND 5");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

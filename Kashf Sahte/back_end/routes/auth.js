// Login

const router = require("express").Router();
const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const tokenPayload = {
      email: user.email,
    };

    const token = user.generateAuthToken(tokenPayload);

    // Include user email in the token payload
    // const tokenPayload = {
    //   _id: user._id,
    //   email: user.email, // assuming email is a field in your User model
    // };
    // const token = jwt.sign(tokenPayload, process.env.JWTPRIVATEKEY, {
    //   expiresIn: "7d",
    // });

    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

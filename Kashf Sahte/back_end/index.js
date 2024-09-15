require("dotenv").config();
const express = require("express");
const session = require("express-session");
var router = express.Router();
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const subRoutes = require("./routes/sub");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const about = "front_end/src/components/About.jsx";
const dotenv = require("dotenv");
require("./routes/googleauth");
const subCheckRoutes = require("./routes/subcheck");
const transporter = require("./mailer");
const sendEmail = require("./routes/sendemail");
const axios = require("axios"); // To Install
const multer = require("multer"); // To Install
const fileUpload = require("express-fileupload");
const FormData = require("form-data");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

const stripe = require("stripe")(
  "sk_test_51NlGPSGpXLtThc6psDALkXBqAf3FEcHd42svfS6b9Epmu3TsYOIbzNMFGGQ08Fe5T0p92XOsobqGhGeKjmbMNz9800hJcvDVrF"
);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

const YOUR_DOMAIN = "http://localhost:8080";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/update-subscription-status", subRoutes);
app.use("/api/checkSubscription", subCheckRoutes);
app.use("/api/send-email", sendEmail);
//------------------------------------------- Audio Format Converter-----------------------------------------------------------
app.post("/convert_to_flac", upload.single("file"), (req, res) => {
  console.log("Received file:", req.file);

  if (!req.file) {
    console.error("No file uploaded.");
    return res.status(400).send("No file uploaded.");
  }

  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const tempInputPath = path.join(
    uploadsDir,
    path.basename(req.file.originalname)
  );

  try {
    fs.writeFileSync(tempInputPath, req.file.buffer);
  } catch (error) {
    console.error("Error writing file to system:", error);
    return res.status(500).send("Error writing file to system.");
  }

  const tempOutputPath = path.join(
    uploadsDir,
    `${path.basename(req.file.originalname)}.flac`
  );

  exec(
    `ffmpeg -i "${tempInputPath}" -acodec flac "${tempOutputPath}"`,
    (err) => {
      if (err) {
        console.error("Error during conversion:", err);
        fs.unlinkSync(tempInputPath); // Cleanup even on error
        return res.status(500).send("Error converting file.");
      }

      res.download(tempOutputPath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
        }
        fs.unlinkSync(tempInputPath);
        fs.unlinkSync(tempOutputPath);
      });
    }
  );
});
//------------------------------------------- End Format Converter ---------------------------------------------------------------
//----------------------------------------------- Video Detection Model ------------------------------------------------------
app.use(express.static(path.join(__dirname, "..", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post("/detection_video", upload.single("video"), async (req, res) => {
  try {
    const videoData = req.file.buffer;
    const videoName = req.file.originalname;

    console.log("Received video data:", videoData);

    // Use FormData to send the video file
    const formData = new FormData();
    formData.append("video", videoData, videoName);

    console.log("Sending video data to Flask...");
    const flaskResponse = await axios.post(
      "http://127.0.0.1:15000/predict",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        responseType: "json",
      }
    );

    console.log("Response from Flask:", flaskResponse.data);
    res.json(flaskResponse.data);
    console.log("Connection to Flask successful");
  } catch (error) {
    console.error("Node.js Error processing video:", error);
    res.status(500).json({
      error: "Node.js Error processing video",
      message: error.message,
    });
  }
});

//------------------------------------------------- End Video Detection Model -------------------------------------------------

//---------------------------------------------- Audio Detection Model--------------------------------------------

app.post("/detection", upload.single("file"), async (req, res) => {
  try {
    const audioData = req.file.buffer;

    console.log("Received audio data:", audioData); // Debugging line

    console.log("Sending audio data to Flask...");
    const flaskResponse = await axios.post(
      "http://127.0.0.1:25000/detection",
      audioData,
      {
        headers: {
          "Content-Type": "audio/x-flac",
        },
        responseType: "json",
      }
    );

    console.log("Response from Flask:", flaskResponse.data);
    res.json(flaskResponse.data);
    console.log("Connection to Flask successful");
  } catch (error) {
    console.error("Node.js Error processing audio:", error.response.data);
    res.status(500).json({
      error: "Node.js Error processing audio",
      message: error.response.data,
    });
  }
});

//------------------------------------------------- End Audio Detection Model ------------------------------------
// node mailer

// stripe checkout api

app.post("/create-checkout-session", async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/detection",
  });

  res.redirect(303, session.url);
});

app.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = "http://localhost:3000/";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });
  prompt("Subscription Completed!!!!");
  res.redirect(303, portalSession.url);
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;
    const endpointSecret = "whsec_12345"; // Replace with your actual webhook secret

    // Verify the event signature (similar to your existing code)

    // Handle the event
    switch (event.type) {
      case "customer.subscription.created":
        const subscription = event.data.object;
        const userEmail = subscription.customer_email;

        // Update the user's subscription status in the database
        try {
          const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            { subscribed: true },
            { new: true }
          );
          console.log(`User with email ${userEmail} subscribed.`);
        } catch (error) {
          console.error(`Error updating user subscription status: ${error}`);
        }

        break;

      case "customer.subscription.deleted":
        const canceledSubscription = event.data.object;
        const canceledUserEmail = canceledSubscription.customer_email;

        // Update the user's subscription status in the database
        try {
          const updatedUser = await User.findOneAndUpdate(
            { email: canceledUserEmail },
            { subscribed: false },
            { new: true }
          );
          console.log(`User with email ${canceledUserEmail} unsubscribed.`);
        } catch (error) {
          console.error(`Error updating user subscription status: ${error}`);
        }

        break;

      // Handle other events as needed

      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.sendStatus(200);
  }
);

app.listen(8080, () => console.log("Running on port 8080"));

// This is your test secret API key.

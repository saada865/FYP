// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "saadm865@gmail.com",
//     pass: "ohia dpai jvvs ycdu", // Your Gmail account password or app password if 2FA is enabled
//   },
// });

// module.exports = transporter;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saadm865@gmail.com",
    pass: "ohia dpai jvvs ycdu", // Use an app password if using Gmail
  },
});
const sendEmail = async (to, text, image) => {
  try {
    const mailOptions = {
      from: '"Kashf Sahte" <saadm865@gmail.com>',
      to: `saadm865@gmail.com, ${to}`,
      subject: "Complain for Deepfake Content Removal",
      text:
        "This content has been detected as a deepfake by Kashf Sahte, below is the report, kindly remove it from google :  " +
        text,
      attachments: image
        ? [
            {
              filename: "screenshot.png",
              content: new Buffer.from(image, "base64"),
              contentType: "image/png",
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;

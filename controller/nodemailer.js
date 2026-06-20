// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//      user: "developerinforag@gmail.com",      
//     pass: "wldzonqfsbsbbvpx",          
//   },
// });

// module.exports = transporter;

// require("dotenv").config(); // Ensures variables are loaded if this file is run directly
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST || "smtp.gmail.com",
//   port: 587, 
//   secure: false, // true for port 465, false for port 587
//   auth: {
//     user: process.env.EMAIL_USER, // Pulled safely from your environment
//     pass: process.env.EMAIL_PASS, // Pulled safely from your environment
//   },
//   tls: {
//     rejectUnauthorized: false // Prevents cloud networks from blocking the TLS connection
//   }
// });

// // Automatically checks your credentials when the server boots up
// transporter.verify(function (error, success) {
//   if (error) {
//     console.error("❌ Nodemailer configuration error:", error.message);
//   } else {
//     console.log("✅ Nodemailer is authenticated and ready to send emails!");
//   }
// });

// module.exports = transporter;

//ghjkllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll

require("dotenv").config(); // Ensures variables are loaded if this file is run directly
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", //  CRITICAL FOR RENDER: Forces internal optimized settings for Google SMTP
  pool: true,       //  CRITICAL FOR RENDER: Keeps connections alive across cloud instances
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
  tls: {
    rejectUnauthorized: false, // Prevents cloud networks from blocking the TLS connection
    minVersion: "TLSv1.2"
  }
});

// Automatically checks your credentials when the server boots up
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Nodemailer configuration error:", error.message);
  } else {
    console.log("✅ Nodemailer is authenticated and ready to send emails across Render network!");
  }
});

module.exports = transporter;
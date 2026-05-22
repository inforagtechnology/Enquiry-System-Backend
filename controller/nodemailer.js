const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
     user: "developerinforag@gmail.com",      
    pass: "ouegfknatvfqlznr",              
  },
});

module.exports = transporter;

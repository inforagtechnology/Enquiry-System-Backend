const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
     user: "nileshrajput447@gmail.com",      
    pass: "ouegfknatvfqlznr",              
  },
});

module.exports = transporter;

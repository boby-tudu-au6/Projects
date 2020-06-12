
const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({ //sending email with nodemailer
    service:"gmail",
    auth: {
      user: "js903783@gmail.com",
      pass: "kledqreaxifonoyv"
    }
  });
  module.exports = transporter
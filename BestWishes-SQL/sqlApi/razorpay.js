const Razorpay = require("razorpay");

// const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

const instance = new Razorpay({
  key_id: "rzp_test_G9ItKc7jp6dwLR",
  key_secret: "fngPghKlyD5wlMqosgQ4Z8SB"
});

module.exports = instance;

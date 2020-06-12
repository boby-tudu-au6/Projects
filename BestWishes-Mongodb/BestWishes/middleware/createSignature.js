const crypto = require("crypto");

module.exports = (razorpayOrderId, razorPayPaymentId) => {
  const secret = "fngPghKlyD5wlMqosgQ4Z8SB";
  const hmac = crypto.createHmac("sha256", secret);
  const data = `${razorpayOrderId}|${razorPayPaymentId}`;
  hmac.update(data);
  const hash = hmac.digest("hex");
  return hash;
};

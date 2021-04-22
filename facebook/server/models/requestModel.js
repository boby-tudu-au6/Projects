const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  to: { type: Schema.Types.ObjectId, ref: "user" },
  from: { type: Schema.Types.ObjectId, ref: "user" },
  time: { type: Date, default: Date.now }
});
 
const Request = mongoose.model("request", requestSchema);

// Request.find({ to: "5f284a4df7bafd1693f31ffb" })
//   .populate('to')
//   .then(data => console.log(data));
  //tum websocket main jab friend requests arha ahai uss time galti kar rhe ho
  //uss time tumko new object bana ke jab save karoge waha pe userid ko request model m push karo plus to from ka data ke sath 

module.exports = Request;  

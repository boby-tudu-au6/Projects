const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  type:String,
  time:{
    type:Date,
    default:Date.now
  }
})

const Notification = mongoose.model('notification',notificationSchema)
module.exports = Notification
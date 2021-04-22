const mongoose = require("mongoose")
const { stringify } = require("uuid")
const Schema = mongoose.Schema

const groupSchema = new Schema({
  type:String,
  groupName:String,
  groupMember:[],
  time:{
    type:Date,
    default:Date.now
  }
})

const Group = mongoose.model('groups',groupSchema)
module.exports = Group
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname:String,
  lastname:String,
  birthday:String,
  gender:String,
  phone:String,
  email:String,
  password:String,
  token:String,
  friend:[{type:Object}],
  friendRequest:[{type:Schema.Types.ObjectId,ref:"request"}],
  notification:[{type:Object}],
  socketid:{type:String,default:""},
  profilePic:{
    type:String,
    default :"https://www.w3schools.com/bootstrap4/img_avatar3.png"},
  coverImg:{
    type:String,
    default:"https://thumbor.forbes.com/thumbor/711x459/https://specials-images.forbesimg.com/dam/imageserve/855870076/960x0.jpg?fit=scale"
  },
  lastLogin:{ type: Date, default: Date.now },
  place:String,
  curChat:{type:Object},
  post:[{ type: Schema.Types.ObjectId, ref: "post" }],
  city:String,
  bio:String,
  relationship:String,
  education:String,
  language:String,
  vCode:String,
  passReset:{type:Boolean,default:false},
})

const User = mongoose.model('user',userSchema)
module.exports = User
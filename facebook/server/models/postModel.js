const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
  from:{ type: Schema.Types.ObjectId, ref: "user" },
  time:{type:Date, default:Date.now},
  data:{type:Object},
  // like:{type:Number,default:0},
  like:[{type:String}],
  comment:[{type:Object}]
})

const Post = mongoose.model('post',postSchema)
module.exports = Post
const mongoose = require("mongoose")
const shortId = require("shortid")

const Schema = mongoose.Schema;
linkSchema = Schema({
    owner:{
        type:String,
        required:true,
        unique:false
    },
    url:{
        type:String,
        required:true,
        unique:false
    },
    short:{
        type : String,
        required:true,
        unique:false
    },
    clicks:{
        type:Number,
        required:true,
        defualt:0
    }
})
Link = mongoose.model("link",linkSchema);
module.exports = Link


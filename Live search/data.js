const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const wordSchema = Schema({
    word:{
        type:String,
        trim:true,
    },
    value:{
        type:String,
        trim:true
    }
})
const Word = mongoose.model("word",wordSchema);
module.exports = Word
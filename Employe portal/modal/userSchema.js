mongoose = require("mongoose")

Schema = mongoose.Schema;
userSchema = Schema({
    name:{
        type:String,
        required:true,
        unique:false
    },
    emailid:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    companies:{
        type:Array
    },
    employment:{
        type:String,
        default:"none"
    }
})
User = mongoose.model("user",userSchema);
module.exports = User


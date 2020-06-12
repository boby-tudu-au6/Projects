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
        unique:false
    },
    password:{
        type:String,
        required:true,
        unique:false
    }
})
User = mongoose.model("user",userSchema);
module.exports = User


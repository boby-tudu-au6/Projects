mongoose = require("mongoose")

Schema = mongoose.Schema;
comSchema = Schema({
    name:{
        type:String,
        required:true
    },
    owner: {
        type: mongoose.ObjectId,
        ref: "users"
    },
    started: {
        type: Date,
        default: Date.now
    },
    emplyees: {
        type: Array
    }
})
Companies = mongoose.model("companies", comSchema);
module.exports = Companies
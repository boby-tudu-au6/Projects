mongoose = require("mongoose")

Schema = mongoose.Schema;
historySchema = Schema({
    name:{type:String},
    user_id:{type:String},
    j_date:{type:String,default:new Date},
    l_date:{type:String,default:"0"}
})
History = mongoose.model("history", historySchema);
module.exports = History
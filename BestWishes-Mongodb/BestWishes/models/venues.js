const Providers = require('./providers')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const venuesSchema = new Schema({
    venuename: {
        type: String,
        required:true,
    },
    category:{
       type:String,maxlength:10,
       required:true, 
    },
    charges:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    provider:{
        type:Schema.Types.ObjectId,
        ref:"providers",
    },
    review:{
        type:String,maxlength:50,
        required:true
    },
    booking:[{
            type:Schema.Types.ObjectId,
            ref:"booking"
    }],
    capacity:{
        type:Number,
        required:true
    },
    venueimg:{
        type:String,
        required:false
    }
})
// venuesSchema.pre('remove', async function(next) {
//     // 'this' is the client being removed. Provide callbacks here if you want
//     // to be notified of the calls' result.
//     console.log("pre",this._id)
//   const done =await Venues.remove({_id:this._id})
//   //console.log(done)
//     next();
// })

venuesSchema.index({'$**':'text'})
const Venues=mongoose.model('venues',venuesSchema)
module.exports=Venues
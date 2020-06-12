const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    status:{
      type:String,
      default:"inactive"
    },
    tokens: [{
      token: {
        type:
        {
          String,
          required: true
        }
      }
    }],
    Isadmin:{type:Boolean,
     default:false,
      
    }
    ,booking:[{
            type:Schema.Types.ObjectId,
            ref:"booking"
      }],
  },

  { timestamps: true }
);
const bookingSchema = new Schema({
  userid:{
      type:String,
      require:[true,"userid cannot be empty"]
  },
  productId:{
      type:Schema.Types.ObjectId,ref:"venues",
      required:[true,"productId cannot be empty"]
  },
  providerid:{
    type:String,
    required:[true,"provider id cannot be emty"]
  },
  status:{
      type:String,
      default:"incomplete"
  }
})
usersSchema.pre("save", function (next) { // A middleware use so that we can hash a password here only
  if (this.isModified("password")) // this is use ,so that we can do not hash twice
  {
    bcryptjs
      .hash(this.password, 10)
      .then((hashpassword) => {
        this.password = hashpassword
        next()
      })
      .catch((err) => {
        console.log("error in userjs" + err)
      })
  }
  else {
    next()
  }
})
const Booking = mongoose.model("booking", bookingSchema)
const Users = mongoose.model("users", usersSchema)
module.exports = {Users,Booking}
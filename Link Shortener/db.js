mongoose = require("mongoose")
mongoose.connect("mongodb+srv://js903783:apple4648@formfillup-zasik.mongodb.net/april_retest?authSource=admin&replicaSet=formfillup-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true",
{ useNewUrlParser: true,useUnifiedTopology: true })
.then(conn =>{
    console.log("Database connected succesfully")
}).catch(err =>{console.log(err.message)})
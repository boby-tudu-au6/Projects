// mongodb+srv://js903783:apple4648@formfillup-zasik.mongodb.net/test?authSource=admin&replicaSet=formfillup-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true
mongoose = require("mongoose")
// mongodb+srv://js903783:apple4648@formfillup-zasik.mongodb.net/test2?authSource=admin&replicaSet=formfillup-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true
// mongoose.connect("mongodb://127.0.0.1:27017/test2?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
mongoose.connect("mongodb+srv://js903783:apple4648@formfillup-zasik.mongodb.net/test2?authSource=admin&replicaSet=formfillup-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true",
{ useNewUrlParser: true,useUnifiedTopology: true })
.then(conn =>{
    console.log("Database connected succesfully")
}).catch(err =>{console.log(err.message)})
const express=require('express')
const cors = require("cors")
const app=express()
const post=require('./routes/post/route_post')
const get=require("./routes/get/route_get")
const dotenv = require("dotenv")
// require('./models/db')

dotenv.config()
app.use(cors()) 
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(post)
app.use(get)




app.listen(8000,(err)=>{
if(err){
    return res.json(err).status(400)
}
console.log("server running")
})
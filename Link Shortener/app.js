require("./db")
const express = require("express")
const app = express()
const session = require("express-session");
const store = require("session-file-store")(session)
const userRoutes = require("./controller/userRoutes")
const bodyparser = require("body-parser")
const cors = require("cors")
app.set("view engine","ejs")
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.static("views"))
app.use(bodyparser.json())
app.use(session({
    name:"session",
    store: new store,
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        sameSite:"strict",
        maxAge:3600000,  
        secure:false 
    } 
}))
app.use(userRoutes)
const port = process.env.PORT || 8080
app.listen(port,()=>console.log("server started at 8080"))

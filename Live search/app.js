require("./db")
const express = require("express")
const cors = require("cors")
const app = express()
const fs = require('fs')
const Word = require("./data")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.use(express.static("views"))

app.get("/",(_,res)=>{
    res.render("index")
})
app.get("/search",async(req,res)=>{
    const word = req.query.word 
    data = await Word.find({"word":{$regex:word,$options:'i'}}).limit(6)
    res.send(data)
    console.log(data)
    // console.log(word)
})
app.get("/result/:query",async(req,res)=>{
    const word = req.params.query 
    data = await Word.findOne({"word":word})
    res.send(data)
    console.log(data)
})

app.listen(8080,()=>{console.log("server started")})
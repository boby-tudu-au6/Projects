const router = require("express").Router()
const User = require("../modal/userSchema")
const Link = require("../modal/linkSchema")
const auth = require("./auth")
const shortId = require("shortid")


router.get("/register",(req,res)=>res.render("index",{session:req.session}))
router.get("/login",(req,res)=>{res.render("login",{session:req.session})})
router.get("/",auth,async(req,res)=>{res.render("short",{session:req.session})})
router.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})
router.post("/register",async(req,res)=>{
    try{
        const user = await User.create({...req.body})
        if(user) res.redirect("/login")
    }catch(err){
        console.log(err.message)
        res.render("index")
    }
})
router.post("/login",async(req,res)=>{
    const user = await User.findOne({emailid:req.body.email,password:req.body.password})
    if(user){
        req.session.userid = user._id
        return res.redirect("/")
    }else{
        res.json("0")
    }
})

router.post("/short",auth,async(req,res)=>{
    try{
        const shortid = shortId.generate()
        const owner = req.session.userid
        const {url} = {...req.body}
        const link = await Link.create({owner:owner,url:url,short:"https://url-shortz.herokuapp.com/q/"+shortid,clicks:0})
        res.redirect("/")
    }catch(err){
        console.log(err)
    }
})
router.get("/allshort",auth,async(req,res)=>{
    try{
        const id =req.session.userid
        const allLinks = await Link.find({owner:id})
        res.send(allLinks)
    }catch(err){
        console.log(err)
    }
})
router.get("/q/:shorts",async(req,res)=>{
    const short = "https://url-shortz.herokuapp.com/q/"+req.params.shorts
    await Link.updateOne({short:short},{ $inc: { clicks: 1 }})
    const top = await Link.findOne({short:short})
    res.redirect(top.url)
})

module.exports = router
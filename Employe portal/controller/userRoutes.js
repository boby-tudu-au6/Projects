const router = require("express").Router()
const User = require("../modal/userSchema")
const Companies = require("../modal/comSchema")
const auth = require("./auth")
const History = require("../modal/historySchema")


router.get("/register", async(req, res) =>{
    if(req.session.userid){
        const com = await Companies.find()
        return res.render("register",{session:req.session.userid,com:com})
    }else{
        const com = await Companies.find()
        return res.render("register",{session:"none",com:com})
    }
})
router.get("/login", (req, res) => {
    if(req.session.userid){
        return res.render("login",{session:req.session.userid})
    }else{
        return res.render("login",{session:"none"})
    }
})
router.get("/history",auth,async(req,res)=>{
    const histo = await History.find({user_id:req.session.userid})
    const user = await User.findOne({_id:req.session.userid})
    res.render("history",{session:req.session,histo:histo,status:user.employment})
})
router.get("/", async (req, res) => {
    if(req.session.userid){
        const com = await Companies.find()
        return res.render("index",{session:req.session.userid,com:com})
    }else{
        const com = await Companies.find()
        return res.render("index",{session:"none",com:com})
    }
})
router.get("/new",auth,(req,res)=>{
    res.render("new",{session:req.session})
})
router.get("/leave",async(req,res)=>{
    
    const user = await User.findOne({_id:req.session.userid})
    await Companies.update(
        {_id:user.employment},
        {$pop:{"emplyees":-1}}
    )
    const date = new Date
    await User.update(
        {_id:req.session.userid},
        {employment:"none"}
    )
    await History.update(
        {user_id:req.session.userid,l_date:0},
        {"l_date":date}
    )
    res.redirect("/")
})
router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})
router.get("/join/:id",auth,async(req,res)=>{
    const company = await Companies.findOne({_id:req.params.id})
    const user = await User.find({_id:req.session.userid})
    if(user[0].employment=="none"){
        await History.create({name:company._id,user_id:req.session.userid})
        await User.update(
            {_id:req.session.userid},
            {$push:{"companies":req.params.id}}
        )
        await User.update(
            {_id:req.session.userid},
            {employment:company._id}
        )
        await Companies.update(
            {_id:req.params.id},
            {$push:{"emplyees":1}}
        )
        
    }
    res.redirect("/")
})
router.post("/register", async (req, res) => {
    try {
        const user = await User.create({
            ...req.body
        })
        if (user) res.redirect("/login")
    } catch (err) {
        res.redirect("/login")
    }
})
router.post("/login", async (req, res) => {
    const user = await User.findOne({
        emailid: req.body.email,
        password: req.body.password
    })
    if (user) {
        req.session.userid = user._id
        return res.redirect("/")
    } else {
        res.json("0")
    }
})
router.post("/new",auth,async(req,res)=>{
    const name = req.body.name
    const owner = req.session.userid
    await Companies.create({name,owner})
    return res.redirect("/")
})


module.exports = router
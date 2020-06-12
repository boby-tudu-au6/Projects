const authenticate=require('../../middleware/authenticate')
const get=require('../../controller/get_route/get')
const router=require('express').Router()

router.get("/",(req,res)=>{res.status(200).json({message:"this is home page"})})
router.get('/dashboard',get.dashboard) 

//user routes
router.get("/activateClient/:token", get.activateClient)
router.get("/resetClient/:token",get.resetClient)
router.get("/order",authenticate,get.order)
router.get("/logoutuser", authenticate, get.logoutprovider)
router.get("/registeruser",(req,res)=>res.status(200).json({message:"this is registration page for client"}))
router.get("/loginuser",(req,res)=>res.status(200).json({message:"this is login page for client"}))
router.get("/comorder",authenticate,get.completed_order)
router.get("/search",get.search)

//admin routes
router.get("/admin/user",authenticate,get.admin_user)
router.get("/admin/provider",authenticate,get.admin_provider)

//provider routes
router.get("/activate/:token", get.activate)
router.get("/reset/:token",get.reset)
router.get("/logout",authenticate,get.logoutuser)
router.get("/register",(req,res)=>res.status(200).json({message:"this is registration page for provider"}))
router.get("/login",(req,res)=>res.status(200).json({message:"this is login page for provider"}))

// handling invalid route error
router.get("*",(req,res)=>{res.status(404).send({message:"page not found"})})
module.exports=router

// 27:43
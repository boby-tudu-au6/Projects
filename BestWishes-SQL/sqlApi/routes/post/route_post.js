const post=require('../../controller/post_route/post')
const router=require('express').Router()
const authenticate=require('../../middleware/authenticate')
const upload=require('../../middleware/upload')

//user routes
router.post('/registeruser',post.registeruser)
router.post('/loginuser',post.loginuser)
router.post("/forgotClient", post.forgotPassClient)
router.post("/resetClient/:token", post.resetTokenClient)
router.post("/order",post.createOrder)
router.post("/checkoutLogin", post.checkoutLogin)
router.post("/order2",post.order2)
router.post("/checkout",post.chekcout)
router.post("/checkoutVerify", post.checkoutVerify)
router.post("/orderUpdate", post.orderUpdate)

// admin routes
router.post('/admin/removeuser/:id',authenticate,post.admin_remove_user)
router.post('/admin/removeprovider/:id',authenticate,post.admin_remove_provider)
router.post("/admin/removevenue/:id",authenticate,post.admin_remove_venue)

// provider routes
router.post('/register',post.registerprovider)
router.post('/login',post.loginprovider)
router.post("/forgot", post.forgotPass)
router.post("/reset/:token",post.resetToken)
router.post('/addvenue',authenticate,upload,post.venue)
router.post("/provider/removevenue/:id",authenticate,post.provider_remove_venue)
router.post("/provider/updatevenue/:id",authenticate,post.provider_update_venue)

// handling invalid route error
router.post("*",(req,res)=>{res.status(404).send({message:"page not found"})})
module.exports=router
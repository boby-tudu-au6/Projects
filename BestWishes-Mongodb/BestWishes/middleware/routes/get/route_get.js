const authenticate=require('../../middleware/authenticate')
const get=require('../../controller/get_route/get')
const router=require('express').Router()
router.get('/home',authenticate,(req,res)=>{
    res.send("welcome to protected route")
    console.log(res.provider)
})
router.get('/dashboard',get.dashboard)
router.get('/adminuser',authenticate,get.admin_user_dashboard)
router.get('/adminprovider',authenticate,get.admin_provider_dashboard)
router.get("/activate/:token", get.activate)
router.get("/activateClient/:token", get.activateClient)
router.get("/resetClient/:token",get.resetClient)
router.get("/reset/:token",get.reset)
router.get("/order",authenticate,get.order)

// handling invalid route error
router.get("*",(req,res)=>{res.status(404).send({message:"page not found"})})
module.exports=router
//https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&cad=rja&uact=8&ved=2ahUKEwiY89THpdfoAhUryzgGHb_hBS4QFjAEegQIBhAB&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F31321117%2Fnodejs-sequelize-beforecreate-hook-to-do-some-validation&usg=AOvVaw2gdD_vYHwz3-wlaIyWhLOh
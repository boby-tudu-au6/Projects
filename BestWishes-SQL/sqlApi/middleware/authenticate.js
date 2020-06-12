const privatekey=require('../password')
const jwt =require('jsonwebtoken')
module.exports=(req,res,next)=>{
   const auth=req.header('auth-token')
   if(!auth){
       res.status(401).send("Access denied")
   } 
   try{
    const verify=jwt.verify(auth,process.env.SECRET)
    res.payload=verify 
    res.token = auth
    return next()
   }
   catch(err){
    res.status(400).send({message:"invalid token"})
   }

}
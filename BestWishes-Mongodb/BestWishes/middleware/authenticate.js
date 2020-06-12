const privatekey=require('../password')
const jwt =require('jsonwebtoken')
module.exports=(req,res,next)=>{
   const auth=req.header('auth-token')
   if(!auth){
      return res.status(401).send("Access denied")
   } 
   try{
    const verify=jwt.verify(auth,privatekey)
    res.payload=verify // sending the payload info 
    next()
   }
   catch{
   return res.status(400).send("invalid token")
   }

}
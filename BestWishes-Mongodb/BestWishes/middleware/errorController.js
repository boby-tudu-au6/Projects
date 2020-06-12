//const AppError=require('../utils/apperror')
module.exports=(err,req,res,next)=>{
  err.statuscode=err.statuscode ||500;
  err.status=err.status ||'error';
    res.status(err.statuscode).json({
      status:err.status,
      message:err.message,  
    })
}
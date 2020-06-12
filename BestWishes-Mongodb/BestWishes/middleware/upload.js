const express=require('express')
const multer=require('multer')
const path=require('path')
const filepath =path.join(__dirname,'../upload')
console.log(filepath)

//const upload=multer({dest:'upload/'},{Storage:Storage})
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./upload/");
    },
    filename: function(req, file, cb) {
      cb(null,  file.originalname);
    }
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
   //fileFilter: fileFilter
  });
module.exports=upload.single('venueimg'),(req,res,next)=>{
    //console.log(req.file)
    req.file
    next()
}
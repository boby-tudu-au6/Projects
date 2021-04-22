const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Post = require("../models/postModel");
const Request = require('../models/requestModel')
const jwt = require("jsonwebtoken");
const { compare, hash } = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");
const cloudinary = require("./fileUpload/cloudinary/cloudinary")
const bufferToString = require('./fileUpload/bufferToString/bufferToString');
const { json } = require("express");
const { post } = require("./getRoute");



module.exports = {
  // register route
  register: async (req, res) => {
    const {
      firstname,
      lastname,
      gender,
      birthday,
      email,
      phone,
      password
    } = req.body;
    const hashedPassword = await hash(password, 10);
    const testUser = await User.find({email,phone})
    if(testUser.length===0){
      const newUser = await User.create({
        firstname,
        lastname,
        birthday,
        gender,
        email,
        phone,
        password: hashedPassword
      });
      return res.status(201).json({ status: "success", data: newUser });
    }else{
      return res.status(409).json({message:"email already in use"})
    }
  },

  //login route
  login: async (req, res) => {
    try {
      const { email, password, phone } = req.body;
     
      let loggedUser = null
      if (email==null){  loggedUser = await User.find({phone})}
      else{  loggedUser = await User.find({email})}
      const isMatched = await compare(password, loggedUser[0].password);
      
      if (loggedUser !== null) {
        // if (!isMatched) return res.json("Incorrect credentials");

        const test = uuidv4()
        const newdata = await User.findOneAndUpdate({email:loggedUser[0].email},{token:test})  
        
        const userdata = await User.find({_id:newdata._id})
        const token = jwt.sign({ user: userdata }, "secret", {
          expiresIn: "1h"
        });
        res.status(200).json({ status: "success", data: loggedUser[0], token });
      } else {
        res.status(401).json({ status: "failed", message: "unauthorized" });
      }
    } catch (err) {
      return res.json({ msg: err });
    }
  },

  
  search:async(req,res)=>{
    const {token} = req.headers
    const {q} = req.body
    try{
      const data = jwt.verify(token,'secret')
        const data2 = await User.findOne({_id:data.user[0]._id})
        if(data.user[0].token===data2.token){
        const user = await User.find({
          $or:[
            {'firstname':{$regex:q,$options:"i"}}, 
            {'lastname':{$regex:q,$options:"i"}}
          ]
        }).limit(6)
        return res.status(200).json({user})}
    }catch(err){
      return res.status(401).json({message:"invalid token"})
    }
  },
  getRequest:async (req,res)=>{
    const {token} = req.headers
    const {_id} = req.body
    try{
        const data = jwt.verify(token,'secret')
        const data2 = await User.findOne({_id:data.user[0]._id})
        if(data.user[0].token===data2.token){
        const allrequest = await Request.find({to:_id}).populate('from')
        return res.status(200).json(allrequest)
      }
    }catch(err){
      return res.status(401).json({message:"invalid token"})
    }
  },

  // get all friends of provided userid
  getFriend:async (req,res)=>{
    const {token} = req.headers
      try{
        const data = jwt.verify(token,'secret')
        const data2 = await User.findOne({_id:data.user[0]._id})
        if(data.user[0].token===data2.token){
          const user = await User.findOne({_id:req.body._id})
          .populate('friend.friendId')
          return res.status(201).json(user)
        }
      }catch(err){
        return res.status(401).json({message:"invalid token"})
      }
  },
  getChat:async(req,res)=>{
    const {token} = req.headers
    const {userid,friendid,curChat} = req.body
    try{
      const data = jwt.verify(token,'secret')
        const data2 = await User.findOne({_id:data.user[0]._id})
        if(data.user[0].token===data2.token){
          await User.updateOne({_id:userid},{curChat})
          await Message.updateMany({to:userid,unread:"true"},{unread:"false"})
          const chats1 = await Message.find({to:userid,from:friendid})
          const chats2 = await Message.find({to:friendid,from:userid})
          const chats = chats1.concat(chats2)
          return res.status(200).json(chats)
        }
    }catch(err){
      return res.status(401).json({message:"invalid token"})
    }
  },
  delChat:async(req,res)=>{
    const {token} = req.headers
    const {userid} = req.body
    try{
      const data = jwt.verify(token,'secret')
        const data2 = await User.findOne({_id:data.user[0]._id})
        if(data.user[0].token===data2.token){
      await User.updateOne({_id:userid},{curChat:{}})}
    }
    catch(err){return res.status(401).json({message:"invalid token"})}
  },
  checkLogin:async(req,res)=>{
    const {user} = req.body
    try{
      const data = jwt.verify(user,'secret')
      const data2 = await User.findOne({_id:data.user[0]._id})
      if(data.user[0].token===data2.token){
        return res.status(200).json(data.user)
      }
    }catch(err){
      return res.status(200).json({message:"invalid token"})
    }
  },
  
  createGroup: async (req,res)=>{
    const {groupName,groupMember,type} = req.body;
    try{
      const newGroup = await Group.create({
        groupName,
        groupMember,
        type
      })
      res.json({message:newGroup})
    }
   catch(err){
     console.log(err)
     res.status(401).json({message:"server error group not created "})
   }
  

  },
  getpost:async (req,res)=>{
    const posts = []
    const {token} = req.headers
    
    try{
      const data = jwt.verify(token,'secret')
      const data2 = await User.findOne({_id:data.user[0]._id})
      if(data.user[0].token===data2.token){
        const {userid,page} = req.body
        const allpost = await User.findOne({_id:userid})
                        .populate("friend.friendId",'post')
                        .select("friendId post")
        allpost.post.forEach(element=>posts.push(element))
        allpost.friend.forEach(element => {
          let newarr = element.friendId[0].post
          newarr.forEach(item=>posts.push(item))
        });
        const finalpost = await Post.find({_id:{$in:posts}})
                          .sort({time:-1})
                          .limit(5)
                          .skip((page-1)*5)
        res.status(200).json({length:posts.length,data:finalpost})}
    }catch(err){
        return res.status(401).jsom({message:"invalid token"})
    }
  },
  getProfile:async (req,res)=>{
    const {token} = req.headers
    const {userid} = req.body
    const user = await User.findOne({_id:userid})
    res.status(200).json(user)
  },
  getName:async (req,res)=>{
    const {id} = req.body
    const user = await User.findOne({_id:id})
    res.status(200).json({
      firstname:user.firstname,
      lastname:user.lastname,
      profilePic:user.profilePic
    })
  },
  getPostImg:async(req,res)=>{
    const {arr} = req.body
    const post = await Post.find({_id:{$in:arr}})
    .select("data")
    res.status(200).json({post})
  },
  test:async(req,res)=>{
    const {token} = req.headers
    try{
      const data = jwt.verify(token,'secret')
      const data2 = await User.findOne({_id:data.user[0]._id})
      if(data.user[0].token===data2.token){
        return res.status(200).json(data.user)
      }
    }catch(err){
      return res.status(401).json({message:"invalid token"})
    }
  },

  resetPassword: async (req, res) => {
    let type = req.query.type;
    let mobile = req.query.mobile;
    let email = req.query.email;
    if (type === "email") {
      let data = await User.findOne({ email: email });
      if (data) {
        var userOtp = Math.floor(Math.random() * 10000000000) + "";
        userOtp = userOtp.slice(0, 5);

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "rmanas000@gmail.com",
            pass: "12jk1a0348!@#",
          },
        });

        var receiverEmail = email;
        let mailOptions = {
          from: "Facebook",
          to: receiverEmail,
          bcc: "mrmanasranjan547@gmail.com",
          subject: "Password Reset Code",
          text: `Your Password Reset verification code is:   ${userOtp} `,
          html: `<b "style"="color:blue"> Welcome to Facebook.Thanks For Registering With Us Mr. Your Facebook verification code is :-  ${userOtp} </b>`,
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) return console.log(error);
          await User.findOneAndUpdate(
            { email: email },
            { vCode: userOtp },
            { new: true },
            (err, doc) => {
            }
          );
          res.json({message:"otp sent to your reg email"})
        });

      }
      
    } else {
      var userOtp = Math.floor(Math.random() * 10000000000) + "";
      userOtp = userOtp.slice(0, 5);
      let axios = require('axios');
     let OTP= await axios({
        method:"get",
        url:`https://2factor.in/API/V1/5b0fbc87-e6c5-11ea-9fa5-0200cd936042/SMS/${mobile}/${userOtp}`
      })
      await User.findOneAndUpdate(
        { phone: mobile },
        { vCode: userOtp }, 
        { new: true },
        (err, doc) => {
        }
      );
      res.json({message:"otp sent to your reg email"})
     
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { email,mobile ,type} = req.query;
      
      const { vCode } = req.query;
      if(type == "email"){
        const foundUser = await User.find({ email: email });
        console.log((foundUser[0].vCode))
        if (!foundUser) return res.json({ msg: "user doenot exixt" });
        else if (vCode == foundUser[0].vCode) {
          await User.findOneAndUpdate(
            { email: email },
            { passReset: true },
            { new: true },
            (err, doc) => {
              console.log(doc);
            }
          );
          if (!foundUser) return res.json("user not exists");
          res.status(200).json({ msg: "code verified" });
        } else return res.send("code didnt match");
      }else{
        const foundUser = await User.find({ phone: mobile });
        console.log((foundUser[0].vCode))
        if (!foundUser) return res.json({ msg: "user doenot exixt" });
        else if (vCode === foundUser[0].vCode) {
          await User.findOneAndUpdate(
            { phone: mobile },
            { passReset: true },
            { new: true },
            (err, doc) => {
              console.log(doc);
            }
          );
          if (!foundUser) return res.json("user not exists");
          res.status(200).json({ msg: "code verified" });
        } else return res.send("code didnt match");
      }
    } catch (err) {
      console.log(err);
    }
  },
  passChange:async(req,res)=>{
    let {email,mobile,type} = req.query   
     try{
       if(type === "email"){
        const hashedPassword = await hash(req.body.password, 10);
        let userData =await User.find({email:email})
        if(!userData) return res.json({message:"no user found for this details"})
        if(userData[0].passReset === true) {
          await User.findOneAndUpdate({email:email},{password:hashedPassword},{new:true},(err,doc)=>{
            res.json({message:"Password reset Successfully"})
          })
        }else{
          res.json({err:"please verify your email or mobile first"})
        }
    
       }else{
        const hashedPassword = await hash(req.body.password, 10);
        let userData =await User.find({phone:mobile})
        if(!userData) return res.json({message:"no user found for this details"})
        if(userData[0].passReset === true) {
          await User.findOneAndUpdate({phone:mobile},{password:hashedPassword},{new:true},(err,doc)=>{
            res.json({message:"Password reset Successfully"})
          })
        }else{
          res.json({err:"please verify your email or mobile first"})
        }
    
       }
     }catch(err){}

  }




  
};





  
const User = require('../models/userModel')
const Request = require("../models/requestModel")
const Message = require('../models/messageModel')
const Post = require("../models/postModel")
const server = require('./index')
const { v4: uuidv4 } = require('uuid');
const bufferToString = require('../controllers/fileUpload/bufferToString/bufferToString')
const cloudinary = require("../controllers/fileUpload/cloudinary/cloudinary")
const { post } = require('../controllers/postRoute')

 
// websocket functions
const io = require('socket.io')(server);
const users = {}
io.on('connection', socket => {
  
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  // this will log when new user will connect
  console.log(`made socket connection at ${socket.id}`)
  io.sockets.emit("imonline",{socketid:socket.id})

  socket.on("chatRead",async data=>{
    await Message.updateOne({_id:data._id},{unread:"false"})
  })
  // this will run when user will connnect
  socket.on("updatesocketid",async data=>{
    await User.findByIdAndUpdate(
      {_id:data.userid},
      {socketid:socket.id})
      socket.emit('userOnline',{userid:data.userid})
  })

// this will run when user will disconnect
  socket.on("disconnect",async ()=>{
    delete users[socket.id];
    console.log(`userid ${socket.id} is offline`)
    const testuser = await User.findOne({socketid:socket.id})
    socket.broadcast.emit("userDisconnected",{testuser})
    await User.updateOne(
      {socketid:socket.id},
      {socketid:""})
    })

  // this will run when new friend request is created
  socket.on('friendRequest', async (data) => { 
    const {to,from} = data
    const requestFind = await Request.find({ to,from})
    if(requestFind.length===0){
        const newRequest = await Request.create(data)
      io.sockets.emit('requestCreated',newRequest)
    }
   });

  //  this will run when friend request is accepted
   socket.on("acceptRequest",async data=>{
      const room = uuidv4()
      await User.findByIdAndUpdate(
        {_id:data.to},
        {$push:{'friend':{
          room,
          friendId:data.from._id
        }}})
        await User.findByIdAndUpdate(
          {_id:data.from._id},
          {$push:{'friend':{
            room,
            friendId:data.to
          }}})
        await Request.deleteOne({_id:data._id},()=>console.log("request deleted"))
        io.sockets.emit('requestAccepted',{data})
        console.log("request accepted")
   })

  //  this will when friend request is deleted
   socket.on("deleteRequest",async data=>{
     console.log("delete request called")
    const testRequest = await Request.deleteOne({_id:data._id})
    io.sockets.emit('deletedRequest',{testRequest})
   })
   
  //  this will run when new chat is created
  socket.on('message', async (data) => { 
    await Message.create(data)
    socket.emit('message',data)
   });

  //  this will run when user join a new room
  
  // socket.on("leaveroom",({room})=>{
  //   io.of('/').in(room).clients((error, socketIds) => {
  //     if (error) throw error;
    
  //     socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(`room-${room}`));
  //     console.log(`${socket.id} leaved ${room}`)
    
  //   });
  //   io.to(room).emit('useroffline',{userid:socket.id})
  // })
  socket.on('joinroom', data => { 
    // const rooms = io.nsps['/'].adapter.rooms;
    console.log(`${socket.id} joined ${data.room}`)
    socket.join(data.room)
    socket.on("leaveroom",({room})=>{
      io.of('/').in(room).clients((error, socketIds) => {
        if (error) throw error;
      
        socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(`room-${room}`));
        console.log(`${socket.id} leaved ${room}`)
      
      });
      io.to(room).emit('useroffline',{userid:socket.id})
    })
    socket.on("videostarted",()=>{
      socket.emit("yourID", socket.id);
      io.sockets.emit("allUsers", {users});
      
      socket.on("callUser", (data) => {
          io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
      })
      
      socket.on("acceptCall", (data) => {
          io.to(data.to).emit('callAccepted', data.signal);
      })
    })
    socket.on("audiostarted",()=>{
      socket.emit("audio_yourID", socket.id);
      io.sockets.emit("audio_allUsers", {users});
      
      socket.on("audio_callUser", (data) => {
          io.to(data.userToCall).emit('audio_hey', {signal: data.signalData, from: data.from});
      })
      
      socket.on("audio_acceptCall", (data) => {
          io.to(data.to).emit('audio_callAccepted', data.signal);
      })
      socket.on("endaudio",data=>{
        socket.emit("audioended",{data})
      })
    })
    socket.on('chat', async data => { 
      let date = new Date()
      const mes = await Message.find({from:data.from,to:data.to})
      const chats = []
      const timechat = []
      mes.forEach(item=>{
        chats.push(item.body.chat)
        timechat.push((item.time).toString().slice(0,-3))
      })
      if(chats.includes(data.body.chat) && timechat.includes((date.toISOString).toString().slice(0,-3))){
        return 
      }else{
        const chat = await Message.create({...data})
        io.sockets.emit("chat",chat)
      }
      })
    
   });
   socket.on("uploadProfile", async ({ data, userid }) => {
    console.log("data coming")
    const arr = [];
    let message = 'profile picture'

    const imageContent = bufferToString(data.name, data.data);
    const { secure_url } = await cloudinary.uploader.upload(imageContent);
    arr.push({ type: data.type, data: secure_url, userid });

    const Profile = await User.findOneAndUpdate(
      { _id: userid },
      { profilePic: secure_url },
      {new:true},
      (err,Profile)=>{
        io.sockets.emit("profiledone", {userid});
      }
    );
    const newpost = await Post.create({
      from: userid,
      data:{arr, message}
    
    });
   let profilePost= await User.updateOne(
      { _id: userid },
      {
        $push: {
          post: { _id: newpost._id },
        },
      }
    );
  });


  socket.on("uploadCover", async ({ data, userid }) => {
    console.log("data coming")
    const arr = [];
    let message = 'Cover picture Updated'

    const imageContent = bufferToString(data.name, data.data);
    const { secure_url } = await cloudinary.uploader.upload(imageContent);
    arr.push({ type: data.type, data: secure_url, userid });

    const Profile = await User.findOneAndUpdate(
      { _id: userid },
      { coverImg: secure_url },{new:true},(err, Profile) => {
        if (err) {
            return console.log("Something wrong when updating data!");
        }
        io.sockets.emit("coverdone", {userid});
    }
    );
    const newpost = await Post.create({
      from: userid,
      data:{arr, message}
    
    });
   let profilePost= await User.updateOne(
      { _id: userid },
      {
        $push: {
          post: { _id: newpost._id },
        },
      }
    );
    console.log(profilePost)

    
  });
  socket.on('updateBio',async ({data,userid})=>{
    console.log('function fired')
    let arr = []
    let newBio = await  User.findOneAndUpdate({
      _id:userid
    },{
      city:data.city,
      bio:data.bio,
      relationship:data.relationship,
      education:data.education,
      language:data.language
    },{new:true},(err, doc) => {
      if (err) {
          return console.log("Something wrong when updating data!");
      }
      socket.emit("updatebio", {userid})
    })
  })



   socket.on("newpost",({data,userid,message})=>{
     const arr = []
     data.forEach(async item=>{
      const imageContent = bufferToString( item.name,item.data)
        const { secure_url } = await cloudinary.uploader.upload(imageContent)
        arr.push({type:item.type,data:secure_url,userid})
        if(data.length===arr.length){
          const newpost = await Post.create({
            from:userid,
            data:{arr, message}
          })
          await User.updateOne({_id:userid},
            {$push:{
              post:{_id:newpost._id}
            }}
          )
          console.log(newpost)
          io.sockets.emit("newpostdone",newpost)
        }
     })
    
   })

   socket.on("likepost",async ({_id,userid})=>{
     const allpost = await Post.findOne({_id})
     console.log(`${userid}`,allpost.like)
     if(allpost.like.includes(userid)==true){
       let post = allpost.like
       post = post.filter(item=>item!==userid)
       await Post.updateOne({_id},{like:post})
     }else{
      await Post.updateOne({_id},{$push:{like:userid}})
     }
    io.sockets.emit("postupdated")
   })

   socket.on("postcomment",async ({userid,comment,_id})=>{
     const user = await User.findOne({_id:userid})
     await Post.updateOne({_id},{
      $push:{comment:{userid,comment,username:user.firstname}}
    })
    io.sockets.emit("postupdated")
   })

  //  random functin for later use
  // socket.on('chat', async data => { 
  //   const chat = await Message.create({...data})
  //   io.sockets.emit("chat",chat)
  //   // console.log("chat fired",data)
  //  })
});

module.exports = io
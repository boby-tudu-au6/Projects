const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require("../mailTransporter")
const instance = require("../../razorpay")
const { v4: uuid } = require("uuid");
const {Users,Providers,Venues,Booking} = require("../../models/model")
const sequelize = require("sequelize")



module.exports = {
    registeruser: async(req, res) => {
        const body = {...req.body}
        const user={};
        if(body.name){
            if(body.email){
                if(body.password){
                    try{
                        body.password = bcrypt.hashSync(body.password, 10);
                        user.user = await Users.create(body)
                    }catch(err){
                        return res.send({message:err})
                    }
                }else{return res.status(400).json({message:"password is required"})}
            }else{return res.status(400).json({message:"email is required"})}
        }else{return res.status(400).json({message:"name is required"})}

        // creating token for email verification
        const token = jwt.sign({data: [user.user.name,user.user.password]},process.env.SECRET, { expiresIn: '1h' })
                
        // sending email with nodemailer
        transporter.sendMail({
            from:"js903783@gmail.com",
            to: user.user.email, 
            subject: "Account activation link",
            html: "<h1>hello "+user.user.name+",here is you activation link</h1><br><a href='http://bestwishes-sql.herokuapp.com/activateClient/"+token+"'>Activate account</a>" // html body
        },(err,info)=>{
            if(!err){return res.status(200).send(
                {
                    message:"registered successfully",
                    activationLink:"http://bestwishes-sql.herokuapp.com/activateClient/"+token
                })}else{
                    return res.send({message:err})
                }
        });
        res.status(200).json(
            {
                message:"registered successfully",
                activationLink:"http://bestwishes-sql.herokuapp.com/activateClient/"+token
            })
    },
    forgotPass:(req,res)=>{
        token = jwt.sign({data:req.body.email},process.env.SECRET, { expiresIn: '1h' })
        transporter.sendMail({
            from:"js903783@gmail.com",
            to:req.body.email,
            subject:"Password reset link",
            html:"<h1>Click the link to reset you password</h><br>"+
                "<a href='http://bestwishes-sql.herokuapp.com/reset/"+token+"'>Click here</a>"
        })
        res.send({message:"reset link sent to your email"})
        return 1
    },
    forgotPassClient:(req,res)=>{
        token = jwt.sign({data:req.body.email},process.env.SECRET, { expiresIn: '1h' })
        transporter.sendMail({
            from:"js903783@gmail.com",
            to:req.body.email,
            subject:"Password reset link",
            html:"<h1>Click the link to reset you password</h><br>"+
                "<a href='http://bestwishes-sql.herokuapp.com/resetClient/"+token+"'>Click here</a>"
        })
        res.send({
            message:"reset link sent to your email",
            link:"http://bestwishes-sql.herokuapp.com/resetClient/"+token+">Click here</a>"})
    },
    // reset password is happening here for client with token varification
    resetTokenClient:async (req,res)=>{
        try {
            var decoded = jwt.verify(req.params.token, process.env.SECRET);
            const hash = bcrypt.hashSync(req.body.password, 10)
            const user = await Users.update({password:hash},{where:{email:decoded.data}})
            return res.status(200).json({message:"password updated successfully"})
        } catch(err) {
            if(err.name =="TokenExpiredError")return res.send(400,{message:"invalid token"})
            return res.status(400).send({message:err})
        }
    },
    // // reset password is happening here for provider with token varification
    resetToken:async(req,res)=>{
        try {
            var decoded = jwt.verify(req.params.token, process.env.SECRET);
            const hash = bcrypt.hashSync(req.body.password, 10)
            const user = await Providers.update({password:hash},{where:{email:decoded.data}})
            return res.status(200).json({message:"password updated successfully"})
        } catch(err) {
            if(err.name =="TokenExpiredError")return res.send(400,{message:"invalid token"})
            return res.status(400).send({message:err})
        }
    },
    loginuser:async(req,res)=>{
        const {email, password} = {...req.body}
        try{
            const user = await Users.authenticate(email,password)
            if(user){
                if(user.status =="active"){
                    const token = jwt.sign({ id: user.id }, process.env.SECRET)
                    user.tokens=token
                    await user.save()
                    res.status(200).json({message:"login successfully", token:user.tokens})
                }else{
                    res.status(400).json({message:"activate your account first"})
                }
            }else{return res.send({message:"wrong credentials"})}
        }catch(err){
            res.send(err)
        }
    },
    

    registerprovider: async(req, res) => {
        const body = {...req.body}
        const user={};
        body.password = bcrypt.hashSync(body.password, 10);
        try{
            user.user = await Providers.create(body)
        }catch(err){
            return res.send({message:err})
        }

        // creating token for email verification
        const token = jwt.sign({data: [user.user.name,user.user.password]},process.env.SECRET, { expiresIn: '1h' })
                
        // sending email with nodemailer
        transporter.sendMail({
            from:"js903783@gmail.com",
            to: user.user.email, 
            subject: "Account activation link",
            html: "<h1>hello "+user.user.name+",here is you activation link</h1><br><a href='http://bestwishes-sql.herokuapp.com/activate/"+token+"'>Activate account</a>"
        },(err,info)=>{
            if(!err){return res.status(200).send(
                {
                    message:"registered successfully",
                    activationLink:"http://bestwishes-sql.herokuapp.com/activate/"+token
                })}else{
                    return res.send({message:err})
                }
        });
    },
    loginprovider: async (req, res) => {
        const {email, password} = {...req.body}
        try{
            // const test = await Venues.destroy({where:{provider:1}})
            const user = await Providers.authenticate(email,password)
            // res.send(user)
            if(user){
                if(user.status =="active"){
                    const token = jwt.sign({ id: user.id }, process.env.SECRET)
                    user.tokens=token
                    await user.save()
                    res.status(200).json({message:"login successfully", token:user.tokens})
                }else{
                    res.status(400).json({message:"activate your account first"})
                }
            }else{return res.send({message:"wrong credentials"})}
        }catch(err){
            res.send(err)
        }

    },
    
    venue:async (req, res) => {
        const venueimg=req.file.path
        const id = res.payload.id
        const venue = {}
        try{
            const user = await Providers.findOne({where:{tokens:res.token}})
            if(user){
                venue.venue = await Venues.create({...req.body,venueimg})
                venue.venue.provider = id
                await venue.venue.save()
                res.status(200).json({message:"venue uploaded successfully"})
            }else{
                res.status(400).json({message:"you are not registere as provider"})
            }
        }catch(err){
            res.status(400).json({message:err})
        }
    },
    admin_remove_user:async(req,res)=>{
            try {
                const payload_id = res.payload.id
                const admin = await Users.findOne({where:{ id: payload_id }})
                if (admin.isAdmin === "true") {
                    // const  remove=await Users.destroy({where:{id:req.params.id}})
                    const book = Booking.findOne({where:{userid:req.params.id}})
                    if(!book){
                        await Users.destroy({where:{id:req.params.id}})
                        return res.status(200).json("sucessfully removed from website")
                    }else{res.status(400).json({message:"user still engaged"})}
                }
                else{
                    res.status(500).json("only for admin")
                }
            }
            catch (error) {
                res.status(400).json(error)
            }     
    },
    admin_remove_provider:async(req,res)=>{
        try {
            const payload_id = res.payload.id
            const admin = await Users.findOne({where:{ id: payload_id }})
            if (admin.isAdmin === "true") {
                const venue=  await Providers.destroy({where:{provider:req.params.id}})
                if(venue) await Providers.destroy({where:{id:req.params.id}})
                return res.status(200).json("sucessfully removed from website")
            }
            else{
                res.status(500).json("only for admin")
            }
        }
        catch (error) { 
            res.status(400).json({message:"some venues are still engaged",reason:error})
        }    
    },
    admin_remove_venue:async(req,res)=>{
        try {
            const payload_id = res.payload.id
            const admin = await Users.findOne({where:{ id: payload_id }})
            if (admin.isAdmin === "true") {
                const book = await Booking.findOne({where:{venueid:req.params.id}})
                if(!book){await Venues.destroy({where:{id:req.params.id}})}else{
                    res.status(400).json({message:"venue still engaged"})
                }
                return res.status(200).json("sucessfully removed from website")
            }
            else{return res.status(500).json("only for admin")}
        }
        catch (error) {
            res.status(400).json(error)
        }    
    },
    provider_remove_venue:async(req,res)=>{
        try {
            const payload_id = res.payload.id
            const user = await Providers.findOne({where:{ id: payload_id }})
            if (user) {
                const book = await Booking.findOne({where:{venueid:req.params.id}})
                if(!book){await Venues.destroy({where:{id:req.params.id}})}else{
                    return res.status(400).json({message:"venue still engaged"})
                }
                return res.status(200).json("sucessfully removed from website")
            }
            else{
                return res.status(500).json("only for admin")
            }
        }
        catch (error) {
            res.status(400).json(error)
        }   
    },
    provider_update_venue:async(req,res)=>{
        try {
            const payload_id = res.payload.id
            const user = await Providers.findOne({where:{ id: payload_id }})
            if (user) {
                const {capacity,charges} = req.body
                if(capacity){
                    if(charges){
                        const new_venue = await Venues.update({capacity,charges},{where:{id:req.params.id}})
                        return res.status(200).json({message:"venue updated successfully"})
                    }else{res.status(400).json({message:"charges is required"})}
                }else{
                    res.status(400).json({message:"capacity is required"})
                }
                return res.status(200).json("sucessfully removed from website")
            }
            else{
                return res.status(500).json("only for admin")
            }
        }
        catch (error) {
            res.status(400).json(error)
        }   
    },
    createOrder:async(req,res)=>{
        try{
            const auth=req.header('auth-token')
            const userid=jwt.verify(auth,process.env.SECRET)
            const user=  await Users.findOne({where:{tokens:auth}})
            if(user){
                const venue = await Venues.findOne({where:{id:req.body.venueid}})
                if(venue){
                    const newBooking = await Booking.create({...req.body,userid:userid.id})
                    return res.status(200).json({message:"order created succesfully",order:newBooking})
                }else{
                    res.status(400).json({message:"invalid productId"})
                }
            }else{
                res.status(400).json({message:"invalid login credentials"})
            }
        }catch(err){
            res.status(400).json({message:err})
        }
        
    },
    checkoutLogin:async(req,res)=>{
        const {email,password} = req.body
        try{
            const user = await Users.authenticate(email,password)
            if(user)return res.status(200).json({id:user.id,name:user.name})
            res.status(401).json({message:"invalid credentials"})
        }catch(err){
            res.status(400).json({message:err})
        }
    
    },
    
    order2:async(req,res)=>{
        const venues = []
        const details = []
        const order_id = []
        try{
            const num=req.query.page;
            const page ={}
            if(parseInt(num)==0 || parseInt(num)==1 || num==undefined){page.page =0 }else{page.page=(parseInt(num)-1)*4}
            const orders = await Booking.findAll({
                where:{userid:req.body.userid,status:"incomplete"},
                order:[['id','DESC']]
            })
            for(i in orders){
                order_id.push(orders[i].dataValues.id)
                venues.push(orders[i].dataValues.venueid)
            }
            for(a in venues){
                const venue = await Venues.findOne({where:{id:venues[a]}})
                details.push(venue.dataValues)
                venue.dataValues.order_id = order_id[a]
            }
            res.status(200).json(details)
        }catch(err){
            res.status(400).json({message:err})
        }
    },
    // routes for razorpay order creation
    chekcout:async (req, res)=>{
        const { user, amountInPaise, currency } = req.body;
        const transactionId = uuid();
        const orderOptions = {
            currency,
            amount: amountInPaise,
            receipt: transactionId,
            payment_capture: 0
        };
        try {
            const order = await instance.orders.create(orderOptions);
            const transaction = {
            _id: transactionId,
            user,
            order_value: `${amountInPaise / 100} INR`,
            razorpay_order_id: order.id,
            razorpay_payment_id: null,
            razorpay_signature: null,
            isPending: true
            };
            res.status(201).json({
            statusCode: 201,
            orderId: order.id,
            name: user,
            amount: transaction.order_value
            });
        } catch (err) {
            res.status(500).send({ statusCode: 500, message: "Server Error" });
        }
    },
    checkoutVerify:async (req, res) => {
        const {
          amount,
          currency,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        } = req.body;
        try {
         const captureResponse = await instance.payments.capture(
            razorpay_payment_id,
            amount,
            currency
          );
          res.json({message:"payment complete"});
        } catch (err) {
          res.status(500).send({ statusCode: 500, message: "Server Error" });
        }
      },
      orderUpdate:async(req,res)=>{
            try{
                const order = await Booking.findOne({where:{id:req.body.id}})
                order.status = "complete"
                await order.save()
                res.status(200).json({message:"order updated successfulyy"})
            }catch(err){
                res.status(400).json({message:err})
            }
        }
}



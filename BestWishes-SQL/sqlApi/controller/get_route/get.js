const {Users,Providers,Venues,Booking} = require('../../models//model')
const privatekey = require('../../password')
const jwt = require("jsonwebtoken")
const sequelize = require("sequelize")
module.exports = {
    dashboard: async (req, res) => {
        const num=req.query.page;
        const page ={}
        if(parseInt(num)==0 || parseInt(num)==1 || num==undefined){page.page =0 }else{page.page=(parseInt(num)-1)*5}
        try {
            const response = await Venues.findAll({
                order:[['id','ASC']],
                limit:5,
                offset:page.page
            })
            return res.status(200).json(response)
        }
        catch (error) {
            res.status(400).send(error)
        }

    },

    //password reset route for client 
    resetClient:(req,res)=>{
        if(req.params.token){
            res.status(200)
            return res.json({message:"post your password"})
        }
        res.status(400)
        return res.josn({message:"invalid link"})
        return 1
    },

    //password reset route for provider 
    reset:(req,res)=>{
        if(req.params.token){
            res.status(200)
            return res.json({message:"post your password"})
        }
        return res.status(400).json({message:"invalid link"})
    },
    // account activation link for providers
    activate:async(req,res)=>{
        try {
            var decoded = jwt.verify(req.params.token, process.env.SECRET);
            // res.send({name:decoded.data[0],password:decoded.data[1]})
            const user = await Providers.findOne({where:{name:decoded.data[0],password:decoded.data[1]}})
            user.status = "active"
            await user.save()
            return res.status(200).json({message:"account activated"})
        } catch(err) {
            res.send({message:"invalid link"})
        }
    },
    // account activation function  for client
    activateClient:async(req,res)=>{
        try {
            var decoded = jwt.verify(req.params.token, process.env.SECRET);
            const user = await Users.findOne({where:{name:decoded.data[0],password:decoded.data[1]}})
            user.status = "active"
            await user.save()
            return res.status(200).json({message:"account activated"})
        } catch(err) {
            res.status(400).json({message:"invalid link"})
        }
    },
    admin_user: async (req, res) => {
        try {
            const payload_id = res.payload.id
            const admin = await Users.findOne({where:{ id: payload_id }})
            if (admin.isAdmin === "true") {
                const response = await Users.findAll({where:{isAdmin:"false"}})
                return res.status(200).json(response)
            }
            else{
                res.status(500).json("only for admin")
            }
        }
        catch (error) {
            res.status(400).json(error)
        }

    },
    admin_provider: async (req, res) => {
        try {
            const payload_id = res.payload.id
            const admin = await Users.findOne({where:{ id: payload_id }})
            if (admin.isAdmin === "true") {
                const response = await Providers.findAll()
                return res.status(200).json(response)
            }
            else{
                res.status(500).json("only for admin")
            }
        }
        catch (error) {
            res.status(400).json(error)
        }
    },
    admin_booking:async(req,res)=>{
        try {
            const payload_id = res.payload.id
            const admin = await Users.findOne({where:{ id: payload_id }})
            if (admin.isAdmin === "true") {
                const response = await Booking.findAll()
                res.json(response)
                return res.status(200)
            }
            else{
                res.json("only for admin")
                return res.status(500)
            }
        }
        catch (error) {
            res.status(400).json(error)
        }
    },
    order:async(req,res)=>{
        const auth=req.header('auth-token')
        const something=jwt.verify(auth,process.env.SECRET)
        const num = req.query.page
        const page = {}
        if(parseInt(num)==0 || parseInt(num)==1 || num==undefined){page.page =0 }else{page.page=(parseInt(num)-1)*3}
        try{
            const booking = await Booking.findAll({
                order:[['id','DESC']],
                where:{userid:something.id},
                limit:3,
                offset:page.page
            })
            return res.status(200).json({booking})
        }catch(err){
            res.status(400).json({message:err})
        }
    },
    logoutuser:async (req,res)=>{
        try{
            const id=res.payload.id
            const user =await Users.findOne({where:{id:id}})
            user.tokens = null
            await user.save()
            return res.status(200).send({message:"logout success"})
        }
        catch (error){
            return   res.status(500).send(error)
        }
    
    },
    logoutprovider:async(req,res)=>{
        try{
            const id=res.payload.id
            const user =await Providers.findOne({where:{id:id}})
            user.tokens = null
            await user.save()
            return res.status(200).send({message:"logout success"})
        }
        catch (error){
            return   res.status(500).send(error)
        }

    },
    completed_order:async(req,res)=>{
        const auth=req.header('auth-token')
        const something=jwt.verify(auth,process.env.SECRET)
        const num = req.query.page
        const page = {}
        if(parseInt(num)==0 || parseInt(num)==1 || num==undefined){page.page =0 }else{page.page=(parseInt(num)-1)*3}
        try{
            const booking = await Booking.findAll({
                order:[['id','DESC']],
                where:{userid:something.id,status:"complete"},
                limit:3,
                offset:page.page
            })
            return res.status(200).json({booking})
        }catch(err){
            res.status(400).json({message:err})
        }
    },
        
    search:async(req,res)=>{
        try{
            const num=req.query.page;
            const page ={}
            if(parseInt(num)==0 || parseInt(num)==1 || num==undefined){page.page =0 }else{page.page=(parseInt(num)-1)*5}
            const Op = sequelize.Op
            const query = req.query.s
            const data = await Venues.findAll(
                {
                    where:{ 
                        [Op.or]:[
                            {venuename:{ [Op.like]: '%' + query + '%' } },
                            {location:{ [Op.like]: '%' + query + '%' } },
                            {review:{ [Op.like]: '%' + query + '%' } },
                            {category:{ [Op.like]: '%' + query + '%' } }
                        ]
                    },
                    order:[['charges',"ASC"]],
                    limit:5,
                    offset:page.page
                }
            )
            return res.send(data)
        }catch(err){
            res.send(err)
        }
    }
}
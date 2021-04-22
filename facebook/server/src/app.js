require('dotenv').config()
require('./db');
const morgan = require('morgan')
const express = require('express')
const cors = require("cors")
const User  = require('../models/userModel')
// User.findOneAndUpdate({email: 'js903783@gmail.com'}, {password: '123'})
User.findOne({ email: 'js903783@gmail.com'})
.then(data=>console.log(data))

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


const getRouter = require('../routes/getRouter')
const postRouter = require('../routes/postRouter')

app.use(getRouter)
app.use(postRouter)


module.exports = app
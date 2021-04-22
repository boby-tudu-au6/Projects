const cloudinary = require('cloudinary');
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env

cloudinary.config({
    cloud_name: 'dq8ijmlbf', 
    api_key: '192771924689656', 
    api_secret: 'NoTbewqczZ_PQ3Skr5CfIri2Dqo' 
})
module.exports = cloudinary
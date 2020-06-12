const {Booking} = require("../models/model")
const Sequelize = require("sequelize")
const connection = new Sequelize("postgres://yawajtrh:dfGy_y_hg6bKycCFTv0L51rewL_J264x@drona.db.elephantsql.com:5432/yawajtrh")

async function createData(){
    try{
        const data = await Booking.bulkCreate([
            {
                userid:1,
                venueid:91
            },
            {
                userid:1,
                venueid:92
            },
            {
                userid:1,
                venueid:93
            },
            {
                userid:1,
                venueid:94
            },
            {
                userid:1,
                venueid:95
            },
            {
                userid:1,
                venueid:96
            },
            {
                userid:1,
                venueid:97
            },
            {
                userid:1,
                venueid:98
            }
        ])
        return console.log("database created successfully")
    }catch(err){
        console.log(err)
    }
}
createData()
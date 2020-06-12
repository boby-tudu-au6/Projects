const {Providers} = require("../models/model")
const Sequelize = require("sequelize")
const connection = new Sequelize("postgres://yawajtrh:dfGy_y_hg6bKycCFTv0L51rewL_J264x@drona.db.elephantsql.com:5432/yawajtrh")

async function createData(){
    try{
        const data = await Providers.bulkCreate([
            {
                name:"some provider",
                email:"some@email.com",
                password
            }
        ])
        return console.log("database created successfully")
    }catch(err){
        console.log(err)
    }
}
createData()
const {Venues} = require("../models/model")
const Sequelize = require("sequelize")
const connection = new Sequelize("postgres://yawajtrh:dfGy_y_hg6bKycCFTv0L51rewL_J264x@drona.db.elephantsql.com:5432/yawajtrh")

async function createData(){
    try{
        const data = await Venues.bulkCreate([
            {
                venuename:'something',
                category:'hotel',
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                provider:4,
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'hotel taj',
                category:'hotel',
                provider:4,
                charges:6000,
                location:'chennai',
                review:"nice place",
                capacity:200,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'oberoi palace',
                category:'hotel',
                provider:4,
                charges:7000,
                location:'mumbai',
                review:"nice place",
                capacity:100,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'dolphine hotel',
                category:'hotel',
                provider:4,
                charges:1200,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'hotel amravati',
                category:'hotel',
                provider:4,
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'some other hotel',
                category:'hotel',
                provider:4,
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'something',
                category:'hotel',
                provider:4,
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'hotel taj',
                category:'hotel',
                provider:4,
                charges:6000,
                location:'chennai',
                review:"nice place",
                capacity:200,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'oberoi palace',
                category:'hotel',
                provider:4,
                charges:7000,
                location:'mumbai',
                review:"nice place",
                capacity:100,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'dolphine hotel',
                category:'hotel',
                provider:4,
                charges:1200,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'hotel amravati',
                category:'hotel',
                provider:4,
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'some other hotel',
                category:'hotel',
                provider:4,
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'something',
                category:'hotel',
                provider:4,
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'hotel taj',
                category:'hotel',
                provider:4,
                charges:6000,
                location:'chennai',
                review:"nice place",
                capacity:200,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'oberoi palace',
                category:'hotel',
                provider:4,
                charges:7000,
                location:'mumbai',
                review:"nice place",
                capacity:100,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'dolphine hotel',
                category:'hotel',
                provider:4,
                charges:1200,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'hotel amravati',
                category:'hotel',
                provider:4,
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                venuename:'some other hotel',
                category:'hotel',
                provider:4,
                charges:3000,
                location:'hydrabad',
                review:"nice place",
                capacity:500,
                venueimg:"https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
        ])
        return console.log("database created successfully")
    }catch(err){
        console.log(err)
    }
}
createData()
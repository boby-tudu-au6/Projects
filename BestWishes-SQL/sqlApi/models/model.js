const Sequelize = require("sequelize")
const jwt = require("jsonwebtoken")
const connection = new Sequelize("postgres://yawajtrh:dfGy_y_hg6bKycCFTv0L51rewL_J264x@drona.db.elephantsql.com:5432/yawajtrh",{logging: false})
const bcrypt = require("bcryptjs")


const Users = connection.define("user",{
	name:{
	  type:Sequelize.STRING,
	  allowNull:false
	},
	email:{
	  type:Sequelize.STRING,
	  allowNull:false,
	  unique:{
		  args:true,
		  msg:"email already in use"
	  }
	},
	password:{
	  type:Sequelize.STRING,
	  allowNull:false
	},
	status:{
	  type:Sequelize.STRING,
	  defaultValue: 'inactive'
	},
	isAdmin:{
	  type:Sequelize.STRING,
	  defaultValue:"false"
	}, 
	tokens: {
		type:Sequelize.STRING,
		defaultValue:null
	}
})
const Providers = connection.define("provider",{
  name: {
	type: Sequelize.STRING,
	allowNull:false
  },
  email: {
	type: Sequelize.STRING,
	allowNull:false,
	unique:{
		args:true,
		msg:"email already in use"
	}
  },
  password: {
	type: Sequelize.STRING,
	allowNull:false
  },
  status:{
	  type:Sequelize.STRING,
	  defaultValue:"inactive"
  },
  tokens: {
	type:Sequelize.STRING,
	defaultValue:null
  }

})
const Venues = connection.define("venue",{
    venuename: {
		type: Sequelize.STRING,
		allowNull:false
    },
    category:{
		type: Sequelize.STRING,
		allowNull:false
    },
    charges:{
		type: Sequelize.STRING,
		allowNull:false
    },
    location:{
		type: Sequelize.STRING,
		allowNull:false
    },
    provider:{
		type: Sequelize.INTEGER,
		references: {
			model: 'providers', 
			key: 'id',
		}
    },
    review:{
		type: Sequelize.STRING,
		allowNull:false
    },
    capacity:{
		type: Sequelize.STRING,
		allowNull:false
    },
    venueimg:{
		type: Sequelize.STRING,
		allowNull:false
    }
})
const Booking = connection.define("booking",{
	userid:{
	  type: Sequelize.INTEGER,
	  references: {
		  model: 'users', 
		  key: 'id',
	  }
	},
	venueid:{ 
	  type: Sequelize.INTEGER,
	  allowNull:false,
	  references: {
		  model: 'venues', 
		  key: 'id',
	  }
	},
	status:{
		type:Sequelize.STRING,
		defaultValue:"incomplete"
	}
  })
Users.authenticate = async function(email,password) {
	try {
	  const user = await Users.findOne({where:{email}})
	  const isMatched = bcrypt.compareSync(password, user.password)
	  if(isMatched)return user

	} catch (err) {
	  return err
	}
}
Providers.authenticate = async function(email,password) {
	try {
		const user = await Providers.findOne({where:{email}})
		const isMatched = bcrypt.compareSync(password, user.password)
	  	if(isMatched)return user
	} catch (err) {
		return err
	}
}
// connection.sync({force:true})
connection.sync({logging: false})

module.exports = {Users,Providers,Venues,Booking} 
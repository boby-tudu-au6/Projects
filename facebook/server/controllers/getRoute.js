// const Post = require("../models/postModel");
const User = require("../models/userModel");

const jwt_decode = require("jwt-decode");
module.exports = {
  home: (_, res) => {
    res.send("welcome to facebook ");
  },
  post: async (req, res) => {
    // const allPost = await Post.find()
    // res.send({status:'success',data:allPost})
    res.send({ message: "this is post page" });
  },

  user: async (req, res) => {
    try {
      let { token } = req.headers;

      var decoded = jwt_decode(token);

      let userData = await User.find({ email: decoded.user.email });
      res.json({ user: userData });
    } catch (err) {
      res.json({ msg: err });
    }
  }
};

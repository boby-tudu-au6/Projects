const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

mongoose
  .connect(
    "mongodb+srv://manasranjan:zXsSCBwNaHvwFO3i@cluster0-hwlgh.mongodb.net/apne-facebook-v-2?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err.message));

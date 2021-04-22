require("dotenv").config();
const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json({ extended: false }));

// // route included
app.use("/payment", require("./route"));

app.listen(port, () => {
    console.log(`server started on port ${port}`)
});
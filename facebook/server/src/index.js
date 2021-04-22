const app = require('./app')
let port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`port is listening  at ${port} dnt worry`);
});
module.exports = server

require("./websocket")
require('../controllers/postRoute')

 
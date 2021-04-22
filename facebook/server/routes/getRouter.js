const router = require("express").Router()
const get = require("../controllers/getRoute")

router.get('/',get.home)
router.get('/post',get.post)
router.get('/loggedUser',get.user)

module.exports = router
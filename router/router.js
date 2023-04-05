const userController = require('../controllers/user-controller')
const Router = require('express').Router


const router = new Router()

router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router
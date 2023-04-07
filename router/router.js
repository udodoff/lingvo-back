//import all dependencies
const userController = require('../controllers/user-controller')
const Router = require('express').Router


//handling routes
const router = new Router()

router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/activate/:link', userController.activate)
router.post('/refresh', userController.refresh)
router.post('/users', userController.getUsers)


module.exports = router
//import all dependencies
const userController = require('../controllers/user-controller')
const Router = require('express').Router
const {body} = require('express-validator')

//handling routes
const router = new Router()

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}),
    userController.createUser
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.post('/refresh', userController.refresh)
router.post('/users', userController.getUsers)


module.exports = router
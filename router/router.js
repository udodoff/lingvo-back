//import all dependencies
const userController = require('../controllers/user-controller')
const Router = require('express').Router
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

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
router.get('/refresh', userController.refresh)
router.get('/users',authMiddleware ,userController.getUsers)


module.exports = router
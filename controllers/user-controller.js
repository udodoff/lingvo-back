//import all dependencies
const userService = require('../service/user-service');
const {validationResult} = require('express-validator')
const ApiError = require('../errors/api-error')


class UserController{
    //when recieving request, calling user functions
    async createUser(request, response, next){
        try {
            const errors = validationResult(request)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Введите корректный email и пароль', errors.array()))
            }
            const {email, password} = request.body;
            const userData = await userService.createUser(email, password)
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return response.json(userData)
        } catch (error) {
            next(error)
        }
    };

    async login(request, response, next){
        try {
            const {email, password} = request.body
            const userData = await userService.login(email, password)
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return response.json(userData)
        } catch (error) {
            next(error)
        }
    };

    async logout(request, response, next){
        try {
            const {refreshToken} = request.cookies;
            const token = await userService.logout(refreshToken)
            response.clearCookie('refreshToken')
            return response.json(token)
        } catch (error) {
            next(error)
        }
    };

    async activate(request, response, next){
        try {
            const activationLink = request.params.link
            await userService.activate(activationLink)
            return response.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error)
        }
    };

    async refresh(request, response, next){
        try {
            
        } catch (error) {
            next(error)
        }
    };

    async getUsers(request, response, next){
        try {
            response.end('hello')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();
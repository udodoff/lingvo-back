//import all dependencies
const userService = require('../service/user-service');
const colors = require('colors')


class UserController{
    //when recieving request, calling user functions
    async createUser(request, response, next){
        try {
            const {email, password} = request.body;
            const userData = await userService.createUser(email, password)
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            console.log(colors.green(userData))
            return response.json(userData)
        } catch (error) {
            console.log(colors.red(error.parent.code));
            response.writeHead(403)
            response.end('User with this email already exists')
        }
    };

    async login(request, response, next){
        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    async logout(request, response, next){
        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    async activate(request, response, next){
        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    async refresh(request, response, next){
        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    async getUsers(request, response, next){
        try {
            // const user = await User.create({
            //     email: 1,
            //     password: 2,
            //     activationLink: 3
            // })
            response.end('hello')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController();
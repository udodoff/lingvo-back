const Sequelize = require('sequelize')
const db = require('../database')
const User = db.user
const colors = require('colors')

class UserController{
    async createUser(request, response, next){
        try {
            await User.create({
                email: request.body.email,
                password: request.body.password,
                isActivated: false
            })
            .then(result => {
                console.log(colors.green(result))
                response.end('ok')
            })
            .catch(error => {
                console.log(colors.red(error.parent.code))
                if(error.parent.code === 'ER_DUP_ENTRY'){
                    response.writeHead(403)
                    response.end('User with this email already exists')
                }
            })
        } catch (error) {
            console.log(error);
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
    }
}

module.exports = new UserController();
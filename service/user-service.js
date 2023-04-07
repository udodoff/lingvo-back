//import all dependencies
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const db = require('../database')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')
const User = db.user

//user functions
class UserService{
    async createUser(email, password){
        const activationLink = uuid.v4()
        const hashedPassword = await bcrypt.hash(password, 3)
        //Create user with email
        const user = await User.create({
            email: email,
            password: hashedPassword,
            activationLink: activationLink
        })

        //send activation email
        await mailService.sendActivationMail(email, activationLink)
        
        //generate and save token

        // console.log("dto", user.dataValues);
        const userDto = new UserDto(user) // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto} 
    };
}


module.exports = new UserService()
//import all dependencies
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mail-service')
const db = require('../database')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')
const User = db.user
const ApiError = require('../errors/api-error')

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
        .catch((err) => {
            throw ApiError.BadRequest("Пользователь с таким email уже существует")
        })
        //send activation email
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        
        //generate and save token
        const userDto = new UserDto(user) // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto} 
    };

    //activate account with email
    async activate(activationLink){
        const userData = await User.findOne({
            where: { activationLink: activationLink },
        });
        if(!userData){
            throw ApiError.BadRequest("Некорректная ссылка активации")
        }
        userData.set({isActivated: true})
        await userData.save()
    }

    //login with email and password
    async login(email, password){
        //check the user exist
        const user = await User.findOne({
            where: { email: email },
        });
        //if it isnt throw error
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        //else check the password is correct
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }
        //update token
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findOne({
            where: { id: userData.id },
        });
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
    
    async getAllUsers(){
        const users = User.findAll();
        return users
    }
}


module.exports = new UserService()
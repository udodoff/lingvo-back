//import all dependencies
const jwt = require('jsonwebtoken')
const db = require('../database')
const colors = require('colors')
const Token = db.token


//token functions
class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    };

    async saveToken(userId, refreshToken){
        //If token exists, update it
        const tokenData = await Token.findOne({
            where: { user: userId },
        });
        if(tokenData){
            tokenData.set({refreshToken: refreshToken})
            return db.token.save()
        }

        //if no token (new user), create it
        const token = await Token.create({
            user: userId,
            refreshToken: refreshToken
        })
        .then(result => {
            console.log(colors.green(result))
        })
        //ошибки при создании юзера
        .catch(error => {
            console.log(colors.red(error))
        })
        return token;
    }
}


module.exports = new TokenService()
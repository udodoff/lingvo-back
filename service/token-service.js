//import all dependencies
const jwt = require('jsonwebtoken')
const db = require('../database')
const colors = require('colors')
const Token = db.token


//token functions
class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    };

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }

    async saveToken(userId, refreshToken){
        //If token exists, update it
        const tokenData = await Token.findOne({
            where: { user: userId },
        });
        if(tokenData){
            tokenData.set({refreshToken: refreshToken})
            return tokenData.save()
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
    async removeToken(refreshToken){
        const tokenData = await Token.destroy({
            where: { refreshToken: refreshToken },
        });
        return tokenData
    }
    async findToken(refreshToken){
        const tokenData = await Token.findOne({
            where: { refreshToken: refreshToken },
        });
        return tokenData
    }
}


module.exports = new TokenService()
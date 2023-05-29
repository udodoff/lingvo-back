//import all dependencies
require('dotenv').config()
const Sequelize = require('sequelize')

//configuration for database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

//init user and token instances
const User = require('../models/user-model')(sequelize)
const Token = require('../models/token-model')(sequelize)

module.exports = {
    sequelize: sequelize,
    user: User,
    token: Token
}

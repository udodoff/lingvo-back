require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

const User = require('../models/user-model')(sequelize)

module.exports = {
    sequelize: sequelize,
    user: User
}
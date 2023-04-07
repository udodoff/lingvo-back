const Sequelize = require('sequelize')

//Scheme of token table
module.exports = (sequelize) => {
    return sequelize.define('token', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        refreshToken: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'token'
    });
}
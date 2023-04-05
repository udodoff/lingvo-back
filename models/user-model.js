const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isActivated: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        activationLink: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        }
    }, {
        timestamps: false
    });
}
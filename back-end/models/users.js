const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('users', {
        userId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull: false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull: false,
        },
        password : {
            type : DataTypes.STRING,
            allowNull: false,
        },
        isAdmin : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}


const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('groups', {
        groupId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull: false,
        },
        userId : {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    })
}


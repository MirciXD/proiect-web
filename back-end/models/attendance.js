const EventDB = require('./').event;
const UserDB = require('./').user;

const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('attendance', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        checkInTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        eventId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
        // eventId : {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: EventDB,
        //         key: "eventId"
        //     }
        // },
        // userId : {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: UserDB,
        //         key: "userId"
        //     }
        // },


    })
}


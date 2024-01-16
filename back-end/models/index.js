const {Sequelize, DataTypes} = require("sequelize");
const db = require("../config/db");


const eventModel = require("./events");
const groupModel = require("./groups");
const userModel = require("./users");
const attendanceModel = require('./attendance');

const event = eventModel(db,Sequelize);
const group = groupModel(db,Sequelize);
const user = userModel(db, Sequelize);
const attendance = attendanceModel(db, Sequelize);

user.hasMany(group);
group.belongsTo(user);

group.hasMany(event);
event.belongsTo(group);

event.hasMany(attendance);
attendance.belongsTo(event);

user.hasMany(attendance);
attendance.belongsTo(user);

// event.belongsToMany(user, {through :attendance})
// user.belongsToMany(event, {through :attendance})

module.exports = {
    event,
    group,
    user,
    attendance,
    connection: db
};
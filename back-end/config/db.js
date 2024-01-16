const Sequelize = require("sequelize");

const db = new Sequelize(
 'attendance_tracking',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
    }    
  }
);

module.exports = db;
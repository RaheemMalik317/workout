const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Aliyah&Nathan@localhost:5432/workout");

module.exports = sequelize;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_management', 'admin', 'admin@123', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = { sequelize };
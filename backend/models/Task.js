const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'), defaultValue: 'Pending' },
    deadline: { type: DataTypes.DATE, allowNull: false },
}, { timestamps: true });

module.exports = Task;

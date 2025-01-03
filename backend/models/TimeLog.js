const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const TimeLog = sequelize.define('TimeLog', {
    timeSpent: { type: DataTypes.STRING, allowNull: false },
    logDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
}, { timestamps: true });
module.exports = TimeLog;
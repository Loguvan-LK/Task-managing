const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    role: { type: DataTypes.ENUM('Admin', 'Developer', 'Manager'), allowNull: false },
}, { timestamps: true });
module.exports = User;

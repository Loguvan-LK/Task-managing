const { sequelize } = require('../config/database');
const User = require('./User');
const Task = require('./Task');
const TimeLog = require('./TimeLog');
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assigneeId' });
Task.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
Task.hasMany(TimeLog, { as: 'timeLogs', foreignKey: 'taskId' });
User.hasMany(Task, { as: 'createdTasks', foreignKey: 'creatorId' });
User.hasMany(Task, { as: 'assignedTasks', foreignKey: 'assigneeId' });
TimeLog.belongsTo(Task, { as: 'task', foreignKey: 'taskId' });
module.exports = {
    sequelize,
    User,
    Task,
    TimeLog,
};
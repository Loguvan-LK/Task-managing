const { Task, User, TimeLog } = require('../models');
const getReport = async (req, res) => {
    try {
        console.log('User Role:', req.role);
        if (req.role !== 'Manager') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const tasks = await Task.findAll({
            include: [
                { model: User, as: 'assignee', attributes: ['id', 'username'] },
                { model: User, as: 'creator', attributes: ['id', 'username'] },
                { model: TimeLog, as: 'timeLogs', attributes: ['timeSpent', 'logDate'] },
            ],
        });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.json({ message: 'Report fetched successfully', tasks });
    } catch (err) {
        console.error('Error fetching report:', err);
        res.status(500).json({ message: 'Error fetching report', error: err.message });
    }
};
module.exports = getReport;
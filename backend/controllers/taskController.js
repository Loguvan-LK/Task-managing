const Task = require('../models/Task');
const User = require('../models/User');
const createTask = async (req, res) => {
    if (req.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { title, description, deadline, assigneeId } = req.body;
        const task = await Task.create({ title, description, deadline, assigneeId, creatorId: req.userId });
        res.status(201).json({
            message: 'Task successfully created',
            task,
        });    } catch (err) {
        res.status(500).json({ message: 'Error creating task', error: err.message });
    }
};
const updateTaskStatus = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        if (isNaN(taskId)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        const { status } = req.body;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.status = status;
        await task.save();
        res.json({ message: 'Task status updated successfully', task });
    } catch (err) {
        console.error('Error updating task status:', err);
        res.status(500).json({ message: 'Error updating task', error: err.message });
    }
};
module.exports = { createTask, updateTaskStatus };
 const User = require('../models/User');
const Task = require('../models/Task');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const createUsers = async (req, res) => {
    console.log('Role:', req.role); // Debugging
    if (req.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { username, email, password, role } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        
        const user = await User.create({ username, email, passwordHash, role });
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};
const editUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (password) {
            user.passwordHash = await bcrypt.hash(password, 10);
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};
const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};


const getAllUsersWithTasks = async (req, res) => {
    if (req.role !== 'Admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const users = await User.findAll({
            include: [
                {
                    model: Task,
                    as: 'createdTasks', // Tasks created by the user
                },
                {
                    model: Task,
                    as: 'assignedTasks', // Tasks assigned to the user
                },
            ],
        });

        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users with tasks:', err);
        res.status(500).json({ message: 'Error fetching users with tasks', error: err.message });
    }
};
module.exports = { createUsers, editUsers, deleteUsers, getAllUsersWithTasks };
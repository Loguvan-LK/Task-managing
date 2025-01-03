// userRoutes.js
const express = require('express');
const { createUsers, editUsers, deleteUsers, getAllUsersWithTasks } = require('../controllers/usersController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authenticate, createUsers);
router.put('/edit/:id', authenticate, editUsers);
router.delete('/delete/:id', authenticate, deleteUsers);
router.get('/users-tasks', authenticate, getAllUsersWithTasks);  // Correctly fetching users and their tasks

module.exports = router;

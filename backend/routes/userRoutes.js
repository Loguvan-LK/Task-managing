const express = require('express');
const jwt = require('jsonwebtoken');
const { createUsers, editUsers, deleteUsers, getAllUsersWithTasks } = require('../controllers/usersController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/create', authenticate, createUsers);
router.put('/edit/:id', authenticate, editUsers);
router.delete('/delete/:id', authenticate, deleteUsers);
router.get('/users-tasks', authenticate, getAllUsersWithTasks);
module.exports = router;
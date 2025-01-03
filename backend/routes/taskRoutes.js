//routes/taskRoutes.js
const express = require('express');
const { createTask, updateTaskStatus, getUserTasks } = require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createTask);
router.put('/:id/status', authenticate, updateTaskStatus);
router.get('/user/:userId', authenticate, getUserTasks); // Corrected this line

module.exports = router;

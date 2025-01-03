
//routes/taskRoutes.js
const express = require('express');
const { createTask, updateTaskStatus } = require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/', authenticate, createTask);
router.put('/:id/status', authenticate, updateTaskStatus);
module.exports = router;

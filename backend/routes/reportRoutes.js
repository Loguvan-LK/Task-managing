const express = require('express');
const getReport = require('../controllers/reportController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();
router.get('/getreports', authenticate, getReport);
module.exports = router;

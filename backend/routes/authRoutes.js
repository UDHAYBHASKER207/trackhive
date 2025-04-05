
const express = require('express');
const router = express.Router();
const { signup, login, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Private routes
router.get('/me', protect, getUserProfile);

module.exports = router;

const express = require('express');
const router = express.Router();
const userAuthController = require('./userauth_controller');

const authMiddleware = require('../../middleware/authMiddleware');

router.post('/register', userAuthController.register);
router.post('/login', userAuthController.login);
router.post('/logout', userAuthController.logout);
router.get('/profile', authMiddleware, userAuthController.getProfile);
router.put('/profile', authMiddleware, userAuthController.profileUpdate);

module.exports = router;


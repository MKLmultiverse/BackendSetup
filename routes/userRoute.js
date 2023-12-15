const express = require('express');
const { registerUser, loginuser, logoutUser, forgotPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginuser)
router.get('/logout',logoutUser)
router.post('/password/forgot',forgotPassword)

module.exports = router;
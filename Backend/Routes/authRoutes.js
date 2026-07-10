const express = require('express');
const router = express.Router();
const {login, register, logout , me , dashboard ,adminDashboard } = require('../Controllers/authController');
const { IsloggedIn , adminOnly} = require('../middleware/authMiddleware');

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me',IsloggedIn,me);
router.get('/dashboard',IsloggedIn,dashboard);
router.get('/admindashboard',adminOnly,adminDashboard);


module.exports = router;
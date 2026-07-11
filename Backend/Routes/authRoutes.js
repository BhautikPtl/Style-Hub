const express = require('express');
const router = express.Router();
const { login, register, logout, me, dashboard, adminDashboard, googleLogin, forgotPassword, resetPassword, addproduct, showproduct } = require('../Controllers/authController');
const { IsloggedIn, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/googlelogin', googleLogin);
router.post('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);
router.get('/me', IsloggedIn, me);
router.get('/dashboard', IsloggedIn, dashboard);
router.get('/admindashboard', adminOnly, adminDashboard);
router.get('/addproduct', adminOnly, addproduct);
router.get('/showproduct', adminOnly, showproduct);


module.exports = router;
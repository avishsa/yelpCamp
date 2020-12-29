const express = require('express');
const router = express.Router();
//middleware
const passport = require('passport');
//controllers
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(users.registerUser);
router.route('/login').get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser);
router.get('/logout', users.logoutUser);

module.exports = router;
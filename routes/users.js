const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');


router.get('/register', (req, res) => {
    res.render('users/register');
});
router.post('/register', async (req, res,next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser,err=>{
            if(err){
                return next(err);
            }
            req.flash('success', 'Welcome to yelp camp');
            res.redirect('/campgrounds');
        });
        
    }
    catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
});
router.get('/login', (req, res) => {
    res.render('users/login');
});
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success','welcome back');
    const redirectURL = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectURL);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success','goodbye');
    res.redirect('/campgrounds');
});

module.exports = router;
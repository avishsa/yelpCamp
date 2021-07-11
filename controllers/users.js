const User = require('../models/user');
const homepage ='/';
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};
module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser,err=>{
            if(err){
                return next(err);
            }
            req.flash('success', 'Welcome to yelp camp');
            res.redirect(homepage);
        });
        
    }
    catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
};
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.loginUser =(req, res) => {
    req.flash('success','welcome back');
    const redirectURL = req.session.returnTo || homepage;
    delete req.session.returnTo;
    res.redirect(redirectURL);
};

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success','goodbye');
    res.redirect(homepage);
};
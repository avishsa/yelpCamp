const ExpressError = require('./utils/ExpressError');
const { campgroundJSScheme, reviewJSScheme} = require('./schemesJS');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isAuthorize = (req,res,next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'you must log in');
        return res.redirect('/login');
    }
    console.log("authorized");
    next();
};

module.exports.validateCampground = (req, res, next) => {

    const { error } = campgroundJSScheme.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.validateIsCampgroundAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error','Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'permission denied - not the author of the campground');
        return res.redirect(`/campgrounds/${id}`);
    }
    console.log("is the author");
    next();    
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewJSScheme.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.validateIsReviewAuthor = async (req, res, next) => {
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review){
        req.flash('error','Cannot find that review');
        return res.redirect('/campgrounds');
    }
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'permission denied - not the author of the review');
        return res.redirect(`/campgrounds/${id}`);
    }
    console.log("is the author");
    next();    
}
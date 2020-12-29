const express = require('express');
const router = express.Router({mergeParams: true});

//middleware
const catchAsync = require('../utils/catchAsync');
const {isAuthorizeReview,validateIsReviewAuthor,validateReview} = require('../middleware');
//controller
const review = require('../controllers/reviews');


router.post('/', isAuthorizeReview,validateReview, catchAsync(review.createReview));
router.delete('/:reviewId',isAuthorizeReview,validateIsReviewAuthor, catchAsync(review.deleteReview));

module.exports = router;
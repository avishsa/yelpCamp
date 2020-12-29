const express = require('express');
const router = express.Router({mergeParams: true});

//middleware
const catchAsync = require('../utils/catchAsync');
const {isAuthorize,validateIsReviewAuthor,validateReview} = require('../middleware');
//controller
const review = require('../controllers/reviews');


router.post('/', validateReview, catchAsync(review.createReview));
router.delete('/:reviewId',isAuthorize,validateIsReviewAuthor, catchAsync(review.deleteReview));

module.exports = router;
const express = require('express');
const router = express.Router();
//middlewares
const catchAsync = require('../utils/catchAsync');
const { isAuthorize, validateCampground, validateIsCampgroundAuthor } = require('../middleware');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage})
//controller
const camground = require('../controllers/camgrounds');

router.route('/')
    .get(catchAsync(camground.index))
    .post(isAuthorize, upload.array('image'),validateCampground, catchAsync(camground.createCampground));
    

router.get('/new', isAuthorize, camground.renderNewForm);

router.route('/:id')
    .get(catchAsync(camground.renderShowCampground))
    .put(isAuthorize, validateIsCampgroundAuthor,upload.array('image'), validateCampground, catchAsync(camground.updateCampground))
    .delete(isAuthorize, validateIsCampgroundAuthor, catchAsync(camground.deleteCampground));;

router.get('/:id/edit', isAuthorize, validateIsCampgroundAuthor, catchAsync(camground.renderEditCampground));

module.exports = router;
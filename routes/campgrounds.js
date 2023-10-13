const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router
  .route('/')
  .get(catchAsync(campgrounds.index)) //index route
  .post(
    isLoggedIn,
    upload.array('image'),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  ); // create route

router.get('/new', isLoggedIn, campgrounds.renderNewForm); // create route: must be above show/id

router
  .route('/:id')
  .get(catchAsync(campgrounds.showCampground)) // show route
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  ) // update route
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)); // delete route

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm)); //edit route

module.exports = router;

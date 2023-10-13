const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

router
  .route('/register')
  .get(users.renderRegister) // render register route
  .post(catchAsync(users.register)); // create post route

router
  .route('/login')
  .get(users.renderLogin) // login route
  .post(
    storeReturnTo,
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    users.login
  ); // login post route, //storeReturnTo to save returnTo value from session to res.locals

router.get('/logout', users.logout); // logout route

module.exports = router;

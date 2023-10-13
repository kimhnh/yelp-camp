const User = require('../models/user');

// render register route
module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

// create post route
module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = await new User({ email, username });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds');
    });
  } catch (e) {
    req.flash('error', `${e.message}.`);
    res.redirect('register');
  }
};

// login route
module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};

// login post route
module.exports.login = (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = res.locals.returnTo || '/campgrounds';
  res.redirect(redirectUrl);
};

// logout route
module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Successfully logged out.');
    res.redirect('/campgrounds');
  });
};

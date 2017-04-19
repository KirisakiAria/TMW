'use strict';

module.exports = {
  checkLogin: (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/tmwcms/signin');
    }
    next();
  },

  checkNotLogin: (req, res, next) => {
    if (req.session.user) {
      return res.redirect('back'); //返回之前的页面
    }
    next();
  },

  checkAuth: (req, res, next) => {
    return req.session.auth;
    next();
  }
};
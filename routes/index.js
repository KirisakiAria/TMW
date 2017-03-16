module.exports = function (app) {
  app.use('/tmwcms', require('./cms.route'));
  app.use('/', require('./main.route'));
  app.use('/news', require('./news.route'));
  // app.use('/daily', require('./daily'));
  // app.use('/share', require('./share'));
  // app.use('/project', require('./project'));
};
module.exports = function (app) {
  app.use('/', require('./main'));
  app.use('/news', require('./news'));
  // app.use('/daily', require('./daily'));
  // app.use('/share', require('./share'));
  // app.use('/project', require('./project'));
};
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/index');
  });
  app.use('/index', require('./main'));
};
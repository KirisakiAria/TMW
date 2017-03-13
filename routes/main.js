var express = require("express");
var router = express.Router();

//主页
router.get('/', function(req, res, next) {
  res.status(200).render('../views/index/index.ejs');
});

//新闻列表页
router.get('/news', function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
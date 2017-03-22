module.exports = function(app) {
	//cms
	app.use('/tmwcms', require('./cms.route'));
	//主页
	app.use('/', require('./main.route'));
	//新闻
	app.use('/news', require('./news.route'));
	// app.use('/daily', require('./daily'));
	// app.use('/share', require('./share'));
	// app.use('/project', require('./project'));
	//404
	app.use(function(req, res) {
		if (!res.headersSent) {
			res.status(404).send("404");
		}
	});
};
'use strict';

//两次回调以上用es7的async函数做异步
module.exports = function(app) {
	//注册
	app.use('/tmwcms/signup', require('./signup.route'));
	//登录
	app.use('/tmwcms/signin', require('./signin.route'));
	//cms
	app.use('/tmwcms', require('./cms.route'));
	//主页
	app.use('/', require('./main.route'));
	//新闻
	app.use('/news', require('./news.route'));
	//日志
	app.use('/daily', require('./daily.route'));
	// app.use('/share', require('./share'));
	// app.use('/project', require('./project'));
	//404
	app.use(function(req, res) {
		if (!res.headersSent) {
			res.status(404).send('404');
		}
	});
};
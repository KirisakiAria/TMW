'use strict';

module.exports = (app) => {
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
	//分享
	app.use('/share', require('./share.route'));
	//个人
	// app.use('/myself', require('./myself'));
	//404
	app.use((req, res) => {
		if (!res.headersSent) {
			res.status(404).send('404');
		}
	});
};
'use strict';

const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
//此模块会检测环境变量的设置，如无特殊设置则自动执行default.js
const config = require('config-lite')(__dirname);
const routes = require('./routes/index.route');
const pkg = require('./package');
const mongoose = require('./config/mongoose');

//执行数据库模型操作
const db = mongoose();

const app = express();

//body-parser中间件处理表单
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');
//使用ejs处理html文件
app.engine('html', require('ejs').renderFile);

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//session 中间件
app.use(session({
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave: true, // 强制更新 session
	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
	cookie: {
		maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore({ // 将 session 存储到 mongodb
		url: config.mongodb // mongodb 地址
	})
}));

// 设置模板全局常量
app.locals.site = {
	title: pkg.name,
	author: pkg.author,
	description: pkg.description
};

// 设置路由
routes(app);

// 监听端口，启动程序
app.listen(config.port, () => {
	console.log(`${pkg.name} listening on port ${config.port}`);
});
'use strict';
const configs = {
	port: 80,
	//是否开放注册
	open:true,
	session: {
		secret: 'TMW',
		key: 'TMW',
		//10天
		maxAge: 864000000
	},
	mongodb: 'mongodb://localhost:27017/TMW'
}
module.exports = configs;

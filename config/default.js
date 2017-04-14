'use strict';
const configs = {
	port: 80,
	session: {
		secret: 'TMW',
		key: 'TMW',
		//10天
		maxAge: 864000000
	},
	mongodb: 'mongodb://lgt:1395317533--++@localhost:27017/TMW?authSource=admin'
	// mongodb: 'mongodb://localhost:27017/TMW'
}
module.exports = configs;
"use strict";
const configs = {
	port: 80,
	session: {
		secret: 'TMW',
		key: 'TMW',
		maxAge: 2592000000
	},
	// mongodb: 'mongodb://KirisakiAria:T!*AT2^ugFvY415C@localhost:27017/TMW?authSource=admin'
	mongodb: 'mongodb://localhost:27017/TMW'
}
module.exports = configs;
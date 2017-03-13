module.exports = {
  port: 80,
  session: {
    secret: 'TMW',
    key: 'TMW',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/TMW'
};
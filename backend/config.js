module.exports = {
  port: process.env.PORT || 4000,
  db: process.env.MONGODB_URI || 'mongodb://mongo:27017/CentrosCulturales',
  secretKey: process.env.SECRET_KEY || 'Wh4tAr3Y0uLo0K1nGF0r'
}

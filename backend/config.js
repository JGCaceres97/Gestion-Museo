module.exports = {
  address: '35.185.124.104',
  port: process.env.PORT || 4000,
  db: process.env.MONGODB_URI || 'mongodb://mongo:27017/CentrosCulturales',
  secretKey: process.env.SECRET_KEY || 'Wh4tAr3Y0uLo0K1nGF0r',
  emailUser: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWORD,
  adminPassword: process.env.ADMIN_PASSWORD || 'admin'
};

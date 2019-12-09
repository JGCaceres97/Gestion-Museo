module.exports = {
  address: process.env.ADDRESS,
  port: process.env.PORT,
  db: process.env.MONGODB_URI,
  defaultUserPass: process.env.DEFAULT_USER_PASS,
  secretKey: process.env.SECRET_KEY,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWORD,
  adminPassword: process.env.ADMIN_PASSWORD
};

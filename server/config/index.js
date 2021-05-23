require("dotenv").config();

module.exports = {
  dbUrl: process.env.MONGODB_URL,
  port: process.env.SERVER_PORT,
  jwtSecret: process.env.JWT_ACCESS_SECRET,

  google: {
    secret: process.env.GOOGLE_AUTH_SECRET,
    clientId: process.env.GOOGLE_AUTH_SECRET,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,
  },

  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD
};

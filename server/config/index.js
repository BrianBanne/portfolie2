const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '../../.env')});

console.log( process.env.GOOGLE_AUTH_SECRET);
module.exports = {
  dbUrl: process.env.MONGODB_URL,
  port: process.env.SERVER_PORT,
  address: '0.0.0.0',
  jwtSecret: process.env.JWT_ACCESS_SECRET,

  google: {
    secret: process.env.GOOGLE_AUTH_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  },

  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
};

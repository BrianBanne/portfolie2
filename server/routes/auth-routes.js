const express = require("express");
const { getRedirectUrl,  getToken } = require("../auth/google");

const AuthRouter = express.Router();

AuthRouter.get("/login/google", getRedirectUrl);
AuthRouter.get("/login/google/callback", getToken);

module.exports = AuthRouter;

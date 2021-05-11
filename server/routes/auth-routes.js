const express = require("express");
const loginAdmin = require("../auth/admin");
const { getRedirectUrl,  getToken } = require("../auth/google");

const AuthRouter = express.Router();

AuthRouter.get("/login/google", getRedirectUrl);
AuthRouter.get("/login/google/callback", getToken);
AuthRouter.post("/login/admin", loginAdmin)



module.exports = AuthRouter;

const { OAuth2Client } = require("google-auth-library");
const Customer = require("../../models/customer");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { getTokenInfo } = require("../../services/auth-user");
const { sendError } = require("../../lib");

const config = require("../../config");
//const client = new OAuth2Client(config.google.clientId);

async function validateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Missing authorization header" });
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.decode(token, config.jwtSecret);

  if (!decodedToken)
    return res
      .status(403)
      .json({ error: "You are not authorized to access this resource" });

  const user = User.findOne({ _id: decodedToken.id, userType: "ADMIN" });
  if (!user)
    return res.status(404).json({ error: "You do not have permission " });
  else next();
}

async function validateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Missing authorization header" });
  try {
    const token = authHeader.split(" ")[1];
    const user = await getTokenInfo(token);
    console.log("tokenInfo", user);
    if (!user)
      return res
        .status(403)
        .json({ error: "You are not authorized to access this resource" });

    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Error occured while validating user");
  }
}

module.exports = { validateAdmin, validateUser };

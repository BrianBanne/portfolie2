const { OAuth2Client } = require("google-auth-library");
const Customer = require("../database/models/customer");
const jwt = require("jsonwebtoken");
const User = require("../database/models/user");
const { getUserFromToken } = require("../auth/google");
const { sendError } = require("../lib");

require("dotenv").config();

//const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

async function validateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Missing authorization header" });
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.decode(token, process.env.JWT_ACCESS_SECRET);

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
    const user = await getUserFromToken(token);
    if (!user)
      return res
        .status(403)
        .json({ error: "You are not authorized to access this resource" });
  } catch (error) {
    sendError(res, 500, "Error occured while validating user")
  }

  next();
}

module.exports = { validateAdmin, validateUser };

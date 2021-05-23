const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { getGoogleToken } = require("../../services/auth-user");
const { sendError } = require("../../lib");
const config = require("../../config");

async function validateAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "Missing authorization header" });
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token, config.jwtSecret);

    if (!decodedToken)
      return res
        .status(403)
        .json({ error: "You are not authorized to access this resource" });

    const admin = User.findOne({ _id: decodedToken.id, userType: "ADMIN" });
    if (!admin)
      return res.status(404).json({ error: "You do not have permission " });
    else next();
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Error occured while validating admin");
  }
}

async function validateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Missing authorization header" });
  try {
    const token = authHeader.split(" ")[1];
    const user = await getGoogleToken(token);
    if (!user)
      return res
        .status(403)
        .json({ error: "You are not authorized to access this resource" });

    req.user = user;
    return next();
  } catch (error) {
    if (error.response.data.error === "invalid_token")
      return sendError(res, 401, "Expired token");
    return sendError(res, 500, "Error occured while validating user");
  }
}

module.exports = { validateAdmin, validateUser };

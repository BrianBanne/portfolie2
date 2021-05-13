const User = require("../database/models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

async function loginAdmin(req, res) {
  const userData = req.body;

  const user = await User.findOne({ email: userData.email, userType: "ADMIN" });
  if (!user) return res.status(401).json({ error: "No admin found" });

  const isPasswordValid = user.password === userData.password;
  if (!isPasswordValid)
    return res.status(401).json({ error: "Password is not correct" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({
    user: { email: user.email, userType: user.userType },
    token: token,
  });
}

module.exports = loginAdmin;

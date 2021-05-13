const { google } = require("googleapis");
const Customer = require("../database/models/customer");

require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_AUTH_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

function getRedirectUrl(req, res) {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  return res.status(200).json({ url: url });
}

async function getToken(req, res) {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  const userinfo = await oauth2Client.getTokenInfo(tokens.access_token);
  const email = userinfo.email;
 // console.log(userInfo);

  if (!email)
    return res.status(400).json({ error: "Unable to obtain email from login" });

  const user = await getUserFromEmail(email);
  console.log(user);

  return res.redirect(
    `http://localhost:3000/login/?token=${tokens.access_token}&email=${user.email}&userId=${user.id}`
  );
}

async function getUserFromEmail(email) {
  console.log(email);
  const userExists = await Customer.findOne({ email: email });
  console.log(userExists);
  if (userExists) return { email: userExists.email, id: userExists.id };

  const newUser = new Customer({ email: email });
  await newUser.save();
  console.log(newUser);
  console.log('new user');
  return { email: userExists.email, id: userExists.id };
}

function authorizeWithGoogle(req, res) {}

module.exports = { getRedirectUrl, getToken };

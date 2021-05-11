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

  console.log(userinfo);

  /** TODO: check if user exists, if not, create a new */

  //const userExists = Customer.findOne({ email: email });
  //if (userExists) return res.redirect(`http://localhost:3000/login/user?token=${tokens.access_token}`);

 /* console.log("ny bruker");

  const newUser = new Customer({ email: email });
  await newUser.save(); */
  return res.redirect(`http://localhost:3000/login/?token=${tokens.access_token}&email=${email}`);
}


function authorizeWithGoogle(req, res) {}

module.exports = { getRedirectUrl, getToken };

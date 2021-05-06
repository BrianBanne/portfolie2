import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);
/* oauth2 shizzle jeg prøvde meg på
<a href="https://github.com/login/oauth/authorize?client_id=myclientid123&redirect_uri=http://localhost:8080/oauth/redirect">
        Login with Github
      </a>
const express = require('express')
const axios = require('axios')
const clientID = '<your client id>'
const clientSecret = '<your client secret>'

const app = express()
app.get('/oauth/redirect', (req, res) => {
  const requestToken = req.query.code
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json'
 }
}).then((response) => {
  const accessToken = response.data.access_token
  res.redirect(`/welcome.html?access_token=${accessToken}`)
})
})
app.use(express.static(__dirname + '/pages/user/index'))
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { stringify } from "query-string";

const stringifiedParams = stringify({
  client_id: process.env.CLIENT_ID_GOES_HERE,
  redirect_uri: "https://www.example.com/authenticate/google",
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "), // space seperated string
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});

const credentials = {
  web: {
    client_id:
      "910772755966-9jn7nj6bdf9bu6t80416etmeli7k3nmb.apps.googleusercontent.com",
    project_id: "portfolio2-312422",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "RLpGkNm2obN95ekSJTOW08Lv",
    redirect_uris: ["http://localhost:3000"],
    javascript_origins: ["http://localhost:3000"],
  },
};

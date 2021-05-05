import React, { useContext, useEffect } from "react";
import Input from "../components/shared/input";
import { useFormFields } from "../components/hooks/index";
import { AuthContext } from "../components/context/auth-context";
import { useHistory } from "react-router-dom";
import Layout from "../components/layout/index";
import Button from "../components/shared/button";
import { GoogleLogin } from "react-google-login";
import { getCustomers, loginGoogle } from "../api";

const LoginPage = () => {
  const { loginAdmin, loginUser, user } = useContext(AuthContext);
  const history = useHistory();

  const CLIENT_ID =
    "910772755966-9jn7nj6bdf9bu6t80416etmeli7k3nmb.apps.googleusercontent.com";

  const { formFields, createChangeHandler } = useFormFields({
    email: "",
    password: "",
    userType: "",
  });

  useEffect(() => {
    if (user) {
      user.userType === "admin"
        ? history.push("/admin")
        : history.push("/user");
    }
  });

  useEffect(() => {
    getCustomers()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    //validate
    //backend validate
    // return token
    //ssetoken
    if (formFields.userType === "admin") {
      loginAdmin(formFields);
    }
    if (formFields.userType === "user") loginUser(formFields);
  }

  function handleGoogleLogin(response) {
    console.log(response);

    /*  const googlePayload = {
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
      token: response.googleId,
      Image: response.profileObj.imageUrl,
      ProviderId: "Google",
    }; */
    //axios post google login
    loginGoogle({ token: response.tokenId })
      .then((user) => {
        console.log(user);
        history.push('/user')
      })
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <div className="form__container">
        <form onSubmit={handleLogin} className="flex">
          <h2>Log in</h2>
          <fieldset style={{ border: "none", textAlign: "center" }}>
            <legend>I am an</legend>
            <Input
              type="radio"
              label="Admin"
              name="userType"
              value="admin"
              onChange={createChangeHandler("userType")}
              inline="true"
            />
            <Input
              type="radio"
              label="User"
              name="userType"
              value="user"
              onChange={createChangeHandler("userType")}
              inline="true"
            />
          </fieldset>
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={formFields.email}
            onChange={createChangeHandler("email")}
          />
          <Input
            label="Password"
            name="passwlrd"
            type="password"
            autoComplete="current-password"
            value={formFields.password}
            onChange={createChangeHandler("password")}
          />
          <Button label="LOG IN" secondary />
          <p style={{ marginTop: "1rem" }}>or</p>
          <GoogleLogin
            className="button button__secondary"
            clientId={CLIENT_ID}
            buttonText="Log in with google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={"single_host_origin"}
          />
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;

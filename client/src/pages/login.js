import React, { useContext, useEffect } from "react";
import { API, getRedirectUrl } from "../api";
import { AuthContext } from "../components/context/auth-context";
import { useFormFields, useQuery } from "../components/hooks/index";
import Layout from "../components/layout/index";
import Button from "../components/shared/button";
import Input from "../components/shared/input";

const LoginPage = () => {
  const { loginAdmin, loginUser } = useContext(AuthContext);
  const query = useQuery();

  const { formFields, createChangeHandler } = useFormFields({
    email: "",
    password: "",
    userType: "",
  });

  /*Handles automatic user login redirect when token from server is served */
  useEffect(() => {
    const token = query.get("token");
    const email = query.get("email");
    if (!(token && email)) return;

    loginUser(token, email);
  }, [query, loginUser]);

  function handleAdminLogin(event) {
    event.preventDefault();
    if (formFields.userType === "ADMIN") {
      console.log(formFields);
      API.loginAdmin(formFields)
        .then(({ data }) => loginAdmin(data))
        .catch((err) => getErrorData(err));
    }
  }

  function getErrorData(err) {
    const errMsg = err?.response?.data.error;
    if (errMsg) alert(errMsg);
    console.log(err);
  }

  function handleGoogleLogin(event) {
    event.preventDefault();
    getRedirectUrl()
      .then(({ data }) => (window.location = data.url))
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <div className="form__container">
        <form className="flex">
          <h2>Log in</h2>
          <fieldset style={{ textAlign: "center", marginTop: "2rem" }}>
            <legend style={{ marginBottom: "1rem" }}>I am an</legend>
            <Input
              type="radio"
              label="User"
              name="userType"
              value="USER"
              onChange={createChangeHandler("userType")}
              inline="true"
              defaultChecked
            />
            <Input
              type="radio"
              label="Admin"
              name="userType"
              value="ADMIN"
              onChange={createChangeHandler("userType")}
              inline="true"
            />
          </fieldset>
          {formFields.userType === "ADMIN" ? (
            <fieldset>
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
              <Button
                label="LOG IN"
                secondary
                onClick={(e) => handleAdminLogin(e)}
              />
            </fieldset>
          ) : (
            <Button
              google
              label="Log in with google"
              onClick={(e) => handleGoogleLogin(e)}
            />
          )}
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;

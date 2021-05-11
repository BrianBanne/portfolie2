import React, { useContext, useEffect } from "react";
import { getRedirectUrl } from "../api";
import { AuthContext } from "../components/context/auth-context";
import { useFormFields, useQuery } from "../components/hooks/index";
import Layout from "../components/layout/index";
import Button from "../components/shared/button";
import Input from "../components/shared/input";

const LoginPage = () => {
  const { loginAdmin, loginUser} = useContext(AuthContext);
  const query = useQuery();

  const { formFields, createChangeHandler } = useFormFields({
    email: "",
    password: "",
    userType: "",
  });

  /*  useEffect(() => {
    if (token) {
      user.userType === "admin"
        ? history.push("/admin")
        : history.push("/user");
    }
  }); */

  /*Handles automatic login redirect when token from server is served */
  useEffect(() => {
    const token =  query.get("token");
    const email = query.get("email");
    if (!(token && email)) return;
    
    loginUser(token, email);
  }, [query, loginUser]);

  function handleLogin(event) {
    event.preventDefault();
    if (formFields.userType === "admin") {
      loginAdmin(formFields);
    }
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
        <form onSubmit={handleLogin} className="flex">
          <h2>Log in</h2>
          <fieldset style={{ textAlign: "center", marginTop: "2rem" }}>
            <legend style={{ marginBottom: "1rem" }}>I am an</legend>
            <Input
              type="radio"
              label="User"
              name="userType"
              value="user"
              onChange={createChangeHandler("userType")}
              inline="true"
              defaultChecked
            />
            <Input
              type="radio"
              label="Admin"
              name="userType"
              value="admin"
              onChange={createChangeHandler("userType")}
              inline="true"
            />
          </fieldset>
          {formFields.userType === "admin" ? (
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
              <Button label="LOG IN" secondary />
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

import React, { useContext, useEffect } from "react";
import Input from "../components/shared/input";
import { useFormFields } from "../components/hooks/index";
import { AuthContext } from "../components/context/auth-context";
import { useHistory } from "react-router-dom";
import Layout from '../components/layout/index'
import Button from "../components/shared/button";
const LoginPage = () => {
  const { loginAdmin, loginUser, user } = useContext(AuthContext);
  const history = useHistory();

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
          <Button label="LOG IN" secondary/>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;

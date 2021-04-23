import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../context/auth-context";

/* If not user is set in context accessing this route will redirect to login-page */
function ProtectedRoute({ children, ...rest }) {
  return (
    <AuthConsumer>
      {({ user }) => (
        <Route
          {...rest}
          render={() => (user ? children : <Redirect to="/login" />)}
        />
      )}
    </AuthConsumer>
  );
}

export default ProtectedRoute
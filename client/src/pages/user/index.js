import React, { useContext } from "react";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <h1>Hi {user.email}</h1>
      <div>
        <p>You have # products and # orders</p>
        <div>
          <h2>Update personal info here:</h2>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;

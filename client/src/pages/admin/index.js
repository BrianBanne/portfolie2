import React, { useContext } from "react";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <h1>Hi {user.email}</h1>
      <div>
        <p>You have # products and # orders</p>
      </div>
    </Layout>
  );
};

export default AdminPage;

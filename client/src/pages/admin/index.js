import React from "react";
import { useHistory } from "react-router";
import Layout from "../../components/layout/index";
import Button from "../../components/shared/button";

const AdminPage = () => {
  const history = useHistory();
  return (
    <Layout>
      <h1>Hi Admin </h1>
      <section>
        <p>From here you can</p>
        <Button
          secondary
          label="Manage products"
          onClick={() => history.push("/admin/products")}
        />
        <p>or</p>
        <Button
          secondary
          label="View orders"
          onClick={() => history.push("/admin/orders")}
        />
      </section>
    </Layout>
  );
};

export default AdminPage;

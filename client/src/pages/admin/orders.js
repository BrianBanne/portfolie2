import React from "react";
import Layout from "../../components/layout/index";
import OrderTable from "../../components/tables/orders-table";

const AdminOrdersPage = () => {
  return (
    <Layout>
      <h1>Orders</h1>
      <OrderTable/>
    </Layout>
  );
};

export default AdminOrdersPage;

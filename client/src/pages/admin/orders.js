import React from "react";
import { TestAPI } from "../../api/test-api";
import Layout from "../../components/layout/index";
import OrderTable from "../../components/tables/orders-table";

const AdminOrdersPage = () => {
  return (
    <Layout>
      <h1>Orders</h1>
      <OrderTable orders={TestAPI.ORDERS} isAdmin/>
    </Layout>
  );
};

export default AdminOrdersPage;

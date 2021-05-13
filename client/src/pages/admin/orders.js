import React, { useEffect, useContext, useState } from "react";
import { AdminAPI } from "../../api";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";
import OrderTable from "../../components/tables/orders-table";

const AdminOrdersPage = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState();

  useEffect(() => {
    AdminAPI.getAllOrders(token)
      .then(({ data }) => {
        setOrders(data.orders);
        console.log(data);
      })
      .catch((err) => console.log(err.response));
  }, [token]);

  return (
    <Layout>
      <h1>Orders</h1>
      <OrderTable orders={orders} isAdmin />
    </Layout>
  );
};

export default AdminOrdersPage;
import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";
import OrderTable from "../../components/tables/orders-table";

const UserOrdersPage = () => {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState();

  useEffect(() => {
    console.log("token ", token);
    API.getUserOrders(token)
      .then(({ data }) => {
        setOrders(data.orders);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <h1>My orders</h1>
      <div>
        <OrderTable orders={orders} />
      </div>
    </Layout>
  );
};

export default UserOrdersPage;

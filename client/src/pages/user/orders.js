import React from "react";
import { TestAPI } from "../../api/test-api";
import Layout from "../../components/layout/index";
import OrderTable from "../../components/tables/orders-table";

const UserOrdersPage = () => {
  const userOrders = TestAPI.ORDERS //.filter((userId) => userId == '110');
  console.log(TestAPI.ORDERS);
  console.log("orders", userOrders);

  return (
    <Layout>
      <h1>Orders</h1>
      <p>todo: orderlist</p>
      <div>
        <OrderTable orders={userOrders} />
      </div>
    </Layout>
  );
};

export default UserOrdersPage;

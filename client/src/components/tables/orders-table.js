import React from "react";
import OrderTableItem from "./order-table.item";

const OrderTable = () => {
  const orders = [
    {
      id: "#123",
      name: "Hans Briansen",
      status: "COMPLETED",
      amount: 2500,
    },
    {
      id: "#321",
      name: "Brian Hansen",
      status: "CANCELLED",
      amount: 1500,
    },
  ];
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 &&
            orders.map((order) => <OrderTableItem key={order.id} order={order} />)}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

import React from "react";
import OrderTableItem from "./order-table.item";

const OrderTable = ({ orders, isAdmin }) => {
  return (
    <div>
      <table>
        <thead>
          {isAdmin ? (
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          ) : (
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th># of items</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          )}
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => (
              <OrderTableItem key={order.orderId} order={order} isAdmin />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

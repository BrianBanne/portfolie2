import React from "react";
import OrderTableItem from "./order-table.item";

const OrderTable = ({ orders }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th># of items</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <OrderTableItem key={order.orderId} order={order} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

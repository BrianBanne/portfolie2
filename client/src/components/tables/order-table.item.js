import React from "react";
import { formatDate } from "../../utils/helpers";

const OrderTableItem = ({ order, isAdmin }) => {
  if (isAdmin)
    return (
      <tr>
        <td>{order._id}</td>
        <td>{order.firstName + " " + order.lastName}</td>
        <td>{formatDate(order.date)}</td>
        <td>{order.total} kr</td>
        <td>{order.orderStatus}</td>
      </tr>
    );

  return (
    <tr>
      <td>{order._id}</td>
      <td>{formatDate(order.date)}</td>
      <td>{order.total} kr</td>
      <td>{order.orderStatus}</td>
    </tr>
  );
};

export default OrderTableItem;

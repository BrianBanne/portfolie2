import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

const OrderTableItem = ({ order, isAdmin }) => {
  function getStatusColor(order) {
    if (order.status === "COMPLETED")
      return <span style={{ color: "green" }}>{order.status}</span>;
    if (order.status === "CANCELLED")
      return <span style={{ color: "red" }}>{order.status}</span>;
    else return <span>{order.status}</span>;
  }


  if (isAdmin)
    return (
      <tr>
        <td>
          <Link to={`/admin/order/${order.orderId}`}>{order.orderId}</Link>
        </td>
        <td>{order.firstName + " " + order.lastName}</td>
        <td>{formatDate(order.date)}</td>
        <td>{order.amount} kr</td>
        <td>{getStatusColor(order)}</td>
      </tr>
    );

  return (
    <tr>
      <td>
        Kanskje penere ID?
      </td>
      <td>{formatDate(order.date)}</td>
      <td>todo: qty mbe?</td>
      <td>{order.total} kr</td>
      <td>{order.orderStatus}</td>
    </tr>
  );
};

export default OrderTableItem;

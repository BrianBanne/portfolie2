import React from "react";
import { formatDate } from "../../utils/helpers";
import { Link } from "react-router-dom";



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
        <td><Link to={`/admin/order/${order._id}`}>{order._id}</Link></td>
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
      <td>{order.quantity}</td>
      <td>{order.total} kr</td>
      <td>{order.orderStatus}</td>
    </tr>
  );
};

export default OrderTableItem;

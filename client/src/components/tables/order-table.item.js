import React from "react";
import { Link } from "react-router-dom";

const OrderTableItem = ({ order }) => {
  function getStatusColor(order) {
    if (order.status === "COMPLETED")
      return <span style={{color:'green'}}>{order.status}</span>;
    if (order.status === "CANCELLED")
      return <span style={{color:'red'}}>{order.status}</span>;
    else return <span>{order.status}</span>;
  }

  return (
    <tr>
      <td>
        <Link to={`/admin/order/${order.id}`}>{order.id}</Link>
      </td>
      <td>{order.name}</td>
      <td>{getStatusColor(order)}</td>
      <td>{order.amount} kr</td>
    </tr>
  );
};

export default OrderTableItem;

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
        <Link to={`/admin/order/${order.id}`}>{order.orderId}</Link>
      </td>
      <td>{order.date}</td>
      <td>todo: qty mbe?</td> 
      <td>{order.amount} kr</td>
      <td>{getStatusColor(order)}</td>

    </tr>
  );
};

export default OrderTableItem;

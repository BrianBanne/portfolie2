import React from "react";
import { Link } from "react-router-dom";
import Button from "../shared/button";

const ProductTableItem = ({ product }) => {
  return (
    <tr>
    <td><Link to={`admin/product/${product.sku}`}>{product.sku}</Link></td>
    <td><img width="60px" src={product.imageUrl} alt={product.name}/> </td>
      <td>{product.name}</td>
      <td>{product.stockStatus}</td>
      <td>{product.price} kr</td>
      <td></td>
      <td><Button secondary style={{width:'70px'}} label="edit"/></td>
      <td><Button secondary style={{width:'60px'}} label="X"/></td>
    </tr>
  );
};

export default ProductTableItem;

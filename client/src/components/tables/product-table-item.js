import React from "react";
import Button from "../shared/button";

const ProductTableItem = ({ product, handleEdit, handleDelete }) => {
  //linker til product og ikke admin/produkt siden den siden ikke var/er lagd.
  return (
    <tr>
      <td>
        <img width="60px" src={product.imageUrl} alt={product.name} />{" "}
      </td>
      <td>{product.name}</td>
      <td>{product.stockQuantity}</td>
      <td>{product.price} kr</td>
      <td>
        <Button
          secondary
          style={{ width: "70px" }}
          label="edit"
          onClick={() => handleEdit(product)}
        />
      </td>
      <td>
        <Button
          secondary
          style={{ width: "70px" }}
          label="x"
          onClick={() => handleDelete(product)}
        />
      </td>
    </tr>
  );
};

export default ProductTableItem;

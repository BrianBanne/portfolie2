import React from "react";
import Button from "../shared/button";
import ProductTableItem from "./product-table-item";

const ProductTable = ({ products }) => {
  return (
    <div>
      <div>
        <Button secondary style={{width:'200px'}} label="Add new"/>
      </div>
      <table>
        <thead>
          <tr>
            <th>Varenummer?</th>
            <th>Image</th>
            <th>Name</th>
            <th>Stock status</th>
            <th>Price</th>
            <th>Category?</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => <ProductTableItem key={product.sku} product={product} />)}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

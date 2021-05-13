import React from "react";
import ProductTableItem from "./product-table-item";

const ProductTable = ({ products, handleEditProduct }) => {
  return (
    <div>
     
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Stock status</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => <ProductTableItem key={product._id} product={product} handeEdit={handleEditProduct} />)}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

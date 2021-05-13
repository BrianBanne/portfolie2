import React, { useEffect, useState } from "react";
import { AdminAPI, API } from "../../api";
import Layout from "../../components/layout";
import ProductTable from "../../components/tables/product-table";

const AdminProductsPage = () => {
  const [products, setProducts] = useState();

  function getProducts() {
    API.getAllProducts()
      .then(({ data }) => setProducts(data.products))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleEditProduct(product) {
    console.log(product);
    AdminAPI.deleteProduct(product._id)
      .then(() => alert(`${product.name} deleted`))
      .then(() => getProducts())
      .catch((err) => console.log(err));
  }
  function handleDeleteProduct(product) {
    console.log(product);
    dispatch({ type: "REMOVE", product });
    
  }

  const produclistActions = {
    handleDeleteProduct,
    ...state,
  };

  return (
    <Layout>
      <h1>Products</h1>
      <ProductTable products={products} handleEditProduct={handleEditProduct} />
    </Layout>
  );
};

export default AdminProductsPage;

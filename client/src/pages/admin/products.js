import React from "react";
import { TestAPI } from "../../api/test-api";
import Layout from "../../components/layout";
import ProductTable from "../../components/tables/product-table";

const AdminProductsPage = () => {

  function handleEditProduct(product){
    console.log(product);
    //api remove product and fetch new
  }

  return (
    <Layout>
      <h1>Products</h1>
      <ProductTable products={TestAPI.PRODUCTS} handleEditProduct={handleEditProduct}/>
    </Layout>
  );
};

export default AdminProductsPage;

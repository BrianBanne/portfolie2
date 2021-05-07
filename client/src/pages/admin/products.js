import React from "react";
import { TestAPI } from "../../api/test-api";
import Layout from "../../components/layout";
import ProductTable from "../../components/tables/product-table";

const AdminProductsPage = () => {

  return (
    <Layout>
      <h1>Products</h1>
      <ProductTable products={TestAPI.PRODUCTS} />
    </Layout>
  );
};

export default AdminProductsPage;

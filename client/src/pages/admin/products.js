import React from "react";
import { PRODUCTS } from "../../api/test";
import Layout from "../../components/layout";
import ProductTable from "../../components/tables/product-table";

const AdminProductsPage = () => {

  return (
    <Layout>
      <h1>Products</h1>
      <ProductTable products={PRODUCTS} />
    </Layout>
  );
};

export default AdminProductsPage;

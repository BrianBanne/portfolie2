import React from "react";
import { TestAPI } from "../api/test-api";
import Layout from "../components/layout";
import ProductGrid from "../components/product/product-grid";


const ShopPage = () => {
  return (
    <Layout>
      <h1>the shop</h1>
      <ProductGrid products={TestAPI.PRODUCTS} />
    </Layout>
  );
};

export default ShopPage;

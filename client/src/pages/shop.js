import React from "react";
import { PRODUCTS } from "../api/test";
import Layout from "../components/layout";
import ProductGrid from "../components/product/product-grid";


const ShopPage = () => {
  return (
    <Layout>
      <h1>the shop</h1>
      <ProductGrid products={PRODUCTS} />
    </Layout>
  );
};

export default ShopPage;

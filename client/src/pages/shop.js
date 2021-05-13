import React, { useEffect, useState } from "react";
import { API } from "../api";
import Layout from "../components/layout";
import ProductGrid from "../components/product/product-grid";

const ShopPage = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    API.getAllProducts()
      .then(({ data }) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <h1>the shop</h1>
      <ProductGrid products={products} />
    </Layout>
  );
};

export default ShopPage;

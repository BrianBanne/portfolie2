import React from "react";
import Layout from "../components/layout";
import ProductGrid from "../components/product/product-grid";

const url = "https://png.pngtree.com/png-clipart/20190516/original/pngtree-premium-white-t-shirt--mockup-png-image_3635949.jpg"
const PRODUCTS = [{name: 'Kul tskjorte',price: 200,  imageUrl: url, description: 'Fet greie'}, {name: 'Grei tskjorte,', price: 250, imageUrl: url,  description: 'Veldig fet greie'}]

const ShopPage = () => {
  return (
    <Layout>
      <h1>This is the shop page :)</h1>
      <ProductGrid products={PRODUCTS} />
    </Layout>
  );
};

export default ShopPage;

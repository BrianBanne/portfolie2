import React from "react";
import Layout from "../../components/layout";
import ProductTable from "../../components/tables/product-table";

const AdminProductsPage = () => {
  const url =
    "https://png.pngtree.com/png-clipart/20190516/original/pngtree-premium-white-t-shirt--mockup-png-image_3635949.jpg";
  const PRODUCTS = [
    {
      name: "Kul tskjorte",
      sku: 111,
      price: 200,
      stockStatus: 3,
      imageUrl: url,
      description: "Fet greie",
    },
    {
      name: "Grei tskjorte,",
      price: 250,
      sku: 122,
      stockStatus: 5,
      imageUrl: url,
      description: "Veldig fet greie",
    },
  ];

  return (
    <Layout>
      <h1>Products</h1>
      <ProductTable products={PRODUCTS} />
    </Layout>
  );
};

export default AdminProductsPage;

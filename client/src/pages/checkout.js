import React from "react";
import CheckoutContainer from "../components/checkout";
import Layout from "../components/layout";

const CheckoutPage = () => {
  return (
    <Layout>
      <h1>Checkout</h1>
      <CheckoutContainer/>
    </Layout>
  );
};

export default CheckoutPage;

import React from "react";
import CartContainer from "../components/cart/cart-container";
import Layout from "../components/layout";

const CartPage = () => {
  return (
    <Layout>
      <h1>Cart</h1>
      <CartContainer/>
    </Layout>
  );
};

export default CartPage;

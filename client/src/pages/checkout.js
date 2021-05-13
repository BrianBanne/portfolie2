import React, { useContext } from "react";
import { AuthContext } from "../components/context/auth-context";
import { ShopContext } from "../components/context/shop-context";
import Layout from "../components/layout";
import Form from "../components/shared/form";
import { API } from "../api/index";

const CheckoutPage = () => {
  const { cart } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  function handleCheckout(formData) {
    console.log(formData);
    console.log(cart);
    const order = {
      shippingDetails: formData,
      cart: cart,
      user: user,
    };
    console.log(order);
    API.createOrder(order).then(({ data }) => alert(data.message));
  }
  const CHECKOUT_DETAILS = [
    {
      type: "input",
      label: "First name",
      name: "firstName",
    },
    {
      type: "input",
      label: "Last name",
      name: "lastName",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
    },
    {
      type: "input",
      label: "Address",
      name: "address",
    },
    {
      type: "input",
      label: "Postcode",
      name: "postcode",
      inline: 1,
    },
    {
      type: "input",
      label: "City",
      name: "city",
      inline: 1,
    },
    {
      type: "text",
      content: 'Total of "amount"',
    },
    {
      type: "submit",
      className: "button button__secondary mt1",
      label: "Place order",
    },
  ];
  return (
    <Layout>
      <Form
        title="Checkout"
        items={CHECKOUT_DETAILS}
        onSubmit={handleCheckout}
      />
    </Layout>
  );
};

export default CheckoutPage;

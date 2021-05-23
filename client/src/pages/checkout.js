import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/auth-context";
import { ShopContext } from "../components/context/shop-context";
import Layout from "../components/layout";
import Form from "../components/shared/form";
import { API } from "../api/index";
import { useHistory } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart, activeDiscount } = useContext(ShopContext);
  const { token, user } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState();
  const history = useHistory();

  useEffect(() => {
    let isSubscribed = true;

    if (token) {
      API.getUserDetails()
        .then(({ data }) =>
          isSubscribed ? setUserDetails(data.userDetails) : setUserDetails(null)
        )
        .catch((err) => console.log(err.message));
    }
    return () => (isSubscribed = false);
  }, [token]);

  function handleCheckout(formData) {
    const order = {
      shippingDetails: formData,
      cart: cart,
      user: user,
    };
    API.createOrder(order)
      .then(({ data }) => {
        alert(data.message);
      })
      .then(() => clearCart())
      .then(() =>
        user.email ? history.push("/user/orders") : history.push("/")
      )
      .catch((err) => alert(err.error));
  }
  const CHECKOUT_DETAILS = [
    {
      type: "title",
      label: "Checkout",
    },
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
      content: `To pay: ${activeDiscount ? 0 : cart.total} NOK `,
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
        initialValues={userDetails}
      />
    </Layout>
  );
};

export default CheckoutPage;

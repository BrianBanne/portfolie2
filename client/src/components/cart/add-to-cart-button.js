import React, { useContext } from "react";
import { AppContext } from "../context/app-context";

const AddToCartButton = ({ product }) => {
  const [cart, setCart] = useContext(AppContext);


  //TODO: update qty
  function handleAddToCart() {
    setCart((prev) => ([ ...prev, product ]));
    alert(product.name + 'added to cart')
    console.log(cart);
  }
  return <button onClick={() => handleAddToCart()}>Add to cart</button>;
};

export default AddToCartButton;

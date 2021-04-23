import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../context/app-context";
import Button from "../shared/button";

const AddToCartButton = ({ product }) => {
  const [cart, setCart] = useContext(AppContext);
  const history = useHistory()


  //TODO: update qty
  function handleAddToCart() {
    setCart((prev) => ([ ...prev, product ]));
    alert(product.name + 'added to cart')
    history.push("/cart")
    console.log(cart);
  }
  return <Button primary onClick={() => handleAddToCart()} label="Add to cart"/>
};

export default AddToCartButton;

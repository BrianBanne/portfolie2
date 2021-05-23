import React, { useContext } from "react";
import { useHistory } from "react-router";
import {  ShopContext } from "../context/shop-context";
import Button from "../shared/button";

const AddToCartButton = ({ product, inInStock }) => {
  const { addToCart } = useContext(ShopContext);
  const history = useHistory();

  //TODO: update qty
  function handleAddToCart() {
    addToCart(product);
    alert(product.name + " added to cart");
    history.push("/cart");
  }
  return (
    <Button secondary disabled={!inInStock} onClick={() => handleAddToCart()} label={inInStock ? "Add to cart" : 'Out of stock'} />
  );
};

export default AddToCartButton;

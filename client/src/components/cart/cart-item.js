import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import Button from "../shared/button";

const CartItem = ({ product }) => {
  const { increment, decrement, removeFromCart } = useContext(ShopContext);

  console.log(product);
  function handleRemoveProduct(event) {
    event.preventDefault();
    removeFromCart(product);
  }

  function handleIncrement(event, action) {
    event.preventDefault();
    increment(product);
  }

  function handleDecrement(event, action) {
    event.preventDefault();
    if (product.quantity === 1) removeFromCart(product);
    decrement(product);
  }

  return (
    <li className="cart__item">
      <figure style={{ width: "100px" }}>
        <img src={product.imageUrl} alt={product.name} width="100%" />
      </figure>
      <div className="cart__item-section">
        <h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
        <p>{product.description}</p>
      </div>
      <div className="cart__item-section">
        <span style={{ display: "block" }}>{product.price} kr</span>
        <Button
          label="remove"
          style={{ width: "100px" }}
          primary
          onClick={(event) => handleRemoveProduct(event)}
        />
      </div>
      <div style={{textAlign:'center'}}>
        <Button
          small
          onClick={(event) => handleIncrement(event)}
          label="+"
        />
        <span style={{ textAlign: "center", width: "48px" , height: "48px", marginTop:'1rem'}}>
          {product.quantity}
        </span>
        <Button
          small
          onClick={(event) => handleDecrement(event)}
          label="-"
        />
      </div>
    </li>
  );
};

export default CartItem;

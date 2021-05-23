import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import Button from "../shared/button";
import CartItem from "./cart-item";

const CartContainer = () => {
  const { cart, clearCart, activeDiscount, setDiscount } =
    useContext(ShopContext);
  const history = useHistory();
  const SHIPPING = 50;

  function getSubtotal() {
    let subtotal = 0;
    cart &&
      cart.forEach((product) => (subtotal += product.price * product.quantity));
    return subtotal;
  }

  function handleClearCart() {
    clearCart();
  }

  function getTotal() {
    return getSubtotal() + SHIPPING;
  }
  function priceReductionForRandomCustomer() {
    return getTotal() - getTotal();
  }

  useEffect(() => {
    if (cart.length > 0 && !activeDiscount) {
      //prevents the popup activating on every cart-render
      setTimeout(function () {
        alert(
          "Congratulations! As our x customer, you've just got a 100% discount on your cart\n developer note, fill x with specified amount from management"
        );
        setDiscount(true);
      }, 2000);
    } else return;
  }, [activeDiscount, setDiscount, cart]);

  const Total = ({ showDiscount }) => {
    if (showDiscount)
      return (
        <div>
          Total after price reduction:
          <div style={{ textDecoration: "line-through", display: "inline" }}>
            {getTotal()}
          </div>
          {"->"}
          {priceReductionForRandomCustomer()} kr
        </div>
      );

    return <div>Total: {getTotal()} kr</div>;
  };

  return (
    <div className="cartContainer">
      {cart?.length > 0 ? (
        <>
          <ul className="cart__item-container">
            {cart &&
              cart.map((product, idx) => (
                <CartItem key={idx} product={product} />
              ))}
          </ul>
          <div>
            <div>Subtotal: {getSubtotal()} kr</div>
            <div>Shipping: {SHIPPING} kr</div>
            <Total showDiscount={activeDiscount} />
          </div>

          <Button primary onClick={handleClearCart} label="Clear cart" />
          <Button
            secondary
            label="Proceed to checkout"
            id="checkout"
            onClick={() => {
              history.push("/checkout");
            }}
          />
        </>
      ) : (
        <p>
          Your cart is empty, <Link to="/shop">click here to fix that</Link>
        </p>
      )}
    </div>
  );
};

export default CartContainer;

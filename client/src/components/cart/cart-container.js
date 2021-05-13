import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import Button from "../shared/button";
import CartItem from "./cart-item";

const CartContainer = () => {
  const { cart, clearCart } = useContext(ShopContext);
  const storagePopup = localStorage.getItem("popupIsShown")
    ? JSON.parse(localStorage.getItem("popupIsShown"))
    : false;
  const [popupIsShown, setPopupIsShown] = useState(storagePopup);

  const history = useHistory();
  const SHIPPING = 50;
  //TODO: ikke bare telle for hvert produkt, men også hvor mange det er av produktet

  function getSubtotal() {
    let subtotal = 0;
    cart && cart.forEach((product) => (subtotal += product.price));
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
    console.log("popu", popupIsShown);
    if (!popupIsShown) {
      //prevents the popup activating on every cart-render
      setTimeout(function () {
        alert(
          "Congratulations! As our x customer, you've just got a 100% discount on your cart\n developer note, fill x with specified amount from management"
        );
        setPopupIsShown(true);
        localStorage.setItem("popupIsShown", true);
      }, 3000);
    } else return;
  }, [popupIsShown, setPopupIsShown]);

  const Total = ({ showDiscount }) => {
    if (showDiscount)
      return (
        <div>
          Total after price reduction:{" "}
          <div style={{ textDecoration: "line-through", display: "inline" }}>
            {" "}
            {getTotal().toString()}
          </div>{" "}
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
            <Total showDiscount={popupIsShown} />
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

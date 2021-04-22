import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AppContext } from "../context/app-context";
import CartItem from "./cart-item";

const CartContainer = () => {
  const [cart, setCart] = useContext(AppContext);
  const history = useHistory();
  const SHIPPING = 50;

  function getSubtotal() {
    let subtotal = 0;
    cart && cart.forEach((product) => (subtotal += product.price));
    return subtotal;
  }

  function handleClearCart() {
    setCart([]);
  }

  function getTotal() {
    return getSubtotal() + SHIPPING;
  }

  console.log(cart);
  return (
    <div className="cartContainer">
      {cart?.length > 0 ? (
        <>
          <ul>
            {cart &&
              cart.map((product, idx) => (
                <CartItem key={idx} product={product} />
              ))}
          </ul>
          <div>
            <div>Subtotal: {getSubtotal()} kr</div>
            <div>Shipping: {SHIPPING} kr</div>
            <div>Total: {getTotal()} kr</div>
          </div>
          <button onClick={handleClearCart}>Clear cart</button>
          <button
            onClick={() => {
              history.push("/checkout");
            }}
          >
            Go to checkout
          </button>
        </>
      ) : (
        <p>
          Your cart is empty,{" "}
          <Link to="/shop">click here to get to the shop</Link>
        </p>
      )}
    </div>
  );
};

export default CartContainer;

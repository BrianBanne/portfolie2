import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import Button from "../shared/button";
import CartItem from "./cart-item";

const CartContainer = () => {
  const { cart, clearCart } = useContext(ShopContext);
  const history = useHistory();
  const SHIPPING = 50;

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
  
  return (
   
    <div className="cartContainer">
     <div id ="mymodal" class="modal">
    <div class="modal-content">
      <span class ="close">&times;</span>
      <p>Congratulations! You're one lucky customer :D Today the cost is on us. Enjoy your free products</p>
    </div>
    </div>
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
            <div>Total: {getTotal()} kr</div>
            
            <div>Total after price reduction: {getTotal().strike} kr `{'->'}`{priceReductionForRandomCustomer()} kr</div>
          </div>
          <Button primary onClick={handleClearCart} label="Clear cart" />
          <Button
            secondary
            label="Go to checkout"
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
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}


export default CartContainer;

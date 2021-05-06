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
  //funker ikke
  window.onload = function() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var btn = document.getElementById("checkout");
    setTimeout(function() {
        document.getElementById('myModal').style.display = 'block';
    }, 1000);
    span.onclick =  modal.style.visibility = "hidden";
    btn.onclick = function() {
      modal.style.display = "block";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.visibility = "hidden";
      }
    }
}
  //funker ikke 
  return (
    <div className="cartContainer">
    <div id="myModal" class="modal">

<div class="modal-content">
  <div class="modal-header">
    <span class="close">&times;</span>
    <h2>Modal Header</h2>
  </div>
  <div class="modal-body">
    <p>Some text in the Modal Body</p>
    <p>Some other text...</p>
  </div>
  <div class="modal-footer">
    <h3>Modal Footer</h3>
  </div>
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
            <div>Total after price reduction: <div style={{ "text-decoration": "line-through","display": "inline"}}> {getTotal().toString()}</div> {'->'} {priceReductionForRandomCustomer()} kr</div>
          </div>
        
          <Button primary onClick={handleClearCart} label="Clear cart" />
          <Button
            secondary
            label="Go to checkout"
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

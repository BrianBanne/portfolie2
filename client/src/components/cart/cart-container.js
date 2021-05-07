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

  window.onload = function() { 
    setTimeout(function() {
        alert("Congratulations! As our x customer, you've just got a 100% discount on your cart\n developer note, fill x with specified amount from management")
        var myDiv = document.getElementById('theDiv');
        myDiv.style.display = myDiv.style.display === 'none' ? 'block' : 'none';
    }, 3000);
}


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
            <div>Total: {getTotal()} kr</div>
            <div id="theDiv" onload="setInterval(onTimerElapsed, 1000);" style={{"display":"none"}}>Total after price reduction: <div 
            style={{ "text-decoration": "line-through","display": "inline"}}> {getTotal().toString()}</div> {'->'} 
            {priceReductionForRandomCustomer()} kr</div>
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

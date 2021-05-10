import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { ShopContext } from "../context/shop-context";
import Button from "../shared/button";

const UserHeader = () => {
 
  const { cart } = useContext(ShopContext);
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/user" className="nav__link">
          Home
        </Link>
        <Link to="/shop" className="nav_link">
         Shop
        </Link>
        <Link to="/user/orders" className="nav__link">
          My orders
        </Link>
        <Link to="/shop" className="nav__link">
          Cart
        </Link>
      </nav>
      <CartIcon cart={cart} />
    </header>
  );
};

export default UserHeader;
const CartIcon = ({ cart }) => {
  const history = useHistory();

  return (
    <div>
      <Button
        label={
          history.location.pathname === "/cart"
            ? "close x"
            : `Cart: ${cart?.length}`
        }
        primary
        style={{ width: "80px" }}
        onClick={() => {
          history.push(
            history.location.pathname === "/cart"
              ? window.history.back()
              : `/cart`
          );
        }}
      />
    </div>
  );
      }

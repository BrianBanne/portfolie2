import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { ShopContext } from "../context/shop-context";
import Button from "../shared/button";

const AdminHeader = () => {
  
  const { cart } = useContext(ShopContext);
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/admin" className="nav__link">
          Home
        </Link>
        <Link to="/shop" className="nav_link">
          Shop
        </Link>
        <Link to="/admin/products" className="nav__link">
          Products
        </Link>
        <Link to="/admin/orders" className="nav__link">
          All Orders
        </Link>
      </nav>
      <CartIcon cart={cart} />
    </header>
  );
};

export default AdminHeader;
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

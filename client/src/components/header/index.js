import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import Button from "../shared/button";

const Header = () => {
  const { cart } = useContext(ShopContext);
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav__link">
          home
        </Link>
        <Link to="/shop" className="nav__link">
          shop
        </Link>
        <Link to="/admin" className="nav__link">
          log in
        </Link>
      </nav>

      <CartIcon cart={cart} />
    </header>
  );
};

export default Header;

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
};

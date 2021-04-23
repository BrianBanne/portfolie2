import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../context/app-context";
import Button from "../shared/button";

const Header = () => {
  const [cart] = useContext(AppContext);
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
    <Button
      label={
        history.location.pathname === "/cart"
          ? "close"
          : `Cart: ${cart?.length}`
      }
      primary
      style={{ width: "70px" }}
      onClick={() => {
        history.push(history.location.pathname === "/cart" ? "/" : `/cart`);
      }}
    />
  );
};

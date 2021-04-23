import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/app-context";

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

      <CartIcon cart={cart}/>
    </header>
  );
};

export default Header;

const CartIcon = ({cart}) => {
  return (
    <Link to="/cart">
      <span>Cart: {cart?.length}</span>
    </Link>
  );
};

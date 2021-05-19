import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { ShopContext } from "../context/shop-context";
import Button from "../shared/button";

const Header = ({ user, admin }) => {
  const { cart } = useContext(ShopContext);
  const { logout } = useContext(AuthContext);

  if (admin)
    return (
      <header className="header">
        <nav className="nav">
          <Link to="/admin" className="nav__link">
            Home
          </Link>
          <Link to="/admin/products" className="nav__link">
            Products
          </Link>
          <Link to="/admin/orders" className="nav__link">
            All orders
          </Link>
        </nav>

        <div>
          <Button
            label="Log out"
            style={{ width: "100px" }}
            secondary
            onClick={() => logout()}
          />
        </div>
      </header>
    );

  if (user)
    return (
      <header className="header">
        <nav className="nav">
          <Link to="/user" className="nav__link">
            My page
          </Link>
          <Link to="/user/orders" className="nav__link">
            My orders
          </Link>
          <Link to="/shop" className="nav__link">
            Shop
          </Link>
        </nav>
        <CartIcon cart={cart} />
      </header>
    );
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav__link">
          Home
        </Link>
        <Link to="/shop" className="nav__link">
          Shop
        </Link>
        <Link to="/login" className="nav__link">
          Log in
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


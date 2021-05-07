import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Button from "../shared/button";

const AdminHeader = () => {
  const { logout } = useContext(AuthContext);
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/admin" className="nav__link">
          home
        </Link>
        <Link to="/admin/products" className="nav__link">
          products
        </Link>
        <Link to="/admin/orders" className="nav__link">
          orders
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
};

export default AdminHeader;

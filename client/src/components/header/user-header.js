import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Button from "../shared/button";

const UserHeader = () => {

  const {logout} = useContext(AuthContext);
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/admin" className="nav__link">
          home
        </Link>
        <Link to="/user/orders" className="nav__link">
         my  orders
        </Link>
      </nav>

      <Button label="Log out" style={{width:'100px'}} secondary onClick={()=> logout()}/>
    </header>
  );
};

export default UserHeader;


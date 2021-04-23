import React, { useContext, useEffect } from "react";
import { invertColors } from "../../styles/lib";
import { AuthContext } from "../context/auth-context";
import Header from "../header";
import AdminHeader from "../header/admin-header";

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);

  useEffect(()=> {
    user?.userType === "admin" ? invertColors(true) : invertColors()
  })

  function getHeader() {
    if (user?.userType === "admin") return <AdminHeader />;
    if (user?.userType === "user")
      //todo userheader
      return <Header />;
    else return <Header />;
  }
  return (
    <>
      {getHeader()}
      <main>{children}</main>
    </>
  );
};

export default Layout;

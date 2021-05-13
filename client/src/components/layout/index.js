import React, { useContext, useEffect } from "react";
import { invertColors } from "../../styles/lib";
import { AuthContext } from "../context/auth-context";
import Header from "../header";

const Layout = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    user?.type === "ADMIN" ? invertColors(true) : invertColors();
  });

  function getHeader() {
    if (token && user?.type === "ADMIN") return <Header admin />;
    if (token && user?.type === "USER") return <Header user />;
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

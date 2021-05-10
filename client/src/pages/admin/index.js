import React, { useContext } from "react";
import { TestAPI } from "../../api/test-api";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";
import Form from "../../components/shared/form";
import Button from "../../components/shared/button";

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const userOrders = TestAPI.ORDERS.filter((id) => id === 321);
  console.log("orders", userOrders);
  const { logout } = useContext(AuthContext);
  //api get user orders by user id
  //TODO: update user details
 function  handleUpdateDetails(){

 }

  const USER_PERSONAL_DETAILS = [
    {
      type: "password",
      label: "Password",
      name: 'password',
      value: ''
    },
    {
      type: "password",
      label: "Enter password again",
      name: 'password2',
      value: ''


    },
    {
      type: "submit",
      label: "Update details",
      onClick: handleUpdateDetails()
    },
  ];
  
  return ( 
    <Layout>
      <h1>Hi {user.email}</h1>
      <div>
        <p>You have # products and #{user.orders} orders</p>
      </div>
      <section>
        <h2>Update personal info:</h2>
        <Form items={USER_PERSONAL_DETAILS}
        />
        <div>
        <Button 
          label="Log out"
          style={{ "width": "100px", "position": "relative", "margin-left": "440px" }}
          secondary
          onClick={() => logout()}
        />
      </div>
      </section>
    </Layout>
  );
};

export default AdminPage;

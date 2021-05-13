import React from "react";
import Layout from "../../components/layout/index";
import Form from "../../components/shared/form";

const AdminPage = () => {
 // const { user } = useContext(AuthContext);
  //const userOrders = TestAPI.ORDERS.filter((id) => id === 321);

  //api get user orders by user id
 function  handleUpdateDetails(){

 }

  const ADMIN_PERSONAL_DETAILS = [
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
      <h1>Hi gluint </h1>
      <div>
        {/* <p>You have # products and #{user.orders} orders</p> */}
      </div>
      <section>
        <h2>Update personal info:</h2>
        <Form items={ADMIN_PERSONAL_DETAILS} />
      </section>
    </Layout>
  );
};

export default AdminPage;
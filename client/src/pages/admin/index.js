import React, { useContext } from "react";
import { TestAPI } from "../../api/test-api";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";
import ProfileInfo from "../../components/update-profile";

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const userOrders = TestAPI.ORDERS.filter(id => id === 321)
  console.log('orders', userOrders);

  //api get user orders by user id

  return (
    <Layout>
      <h1>Hi {user.email}</h1>
      <div>
        <p>You have # products and #{user.orders} orders</p>
      </div>
      <section>
        <h2>Update personal info:</h2>
        <ProfileInfo user={user}/>
      </section>
    
    </Layout>
  );
};

export default AdminPage;

import React, { useContext } from "react";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";
import ProfileInfo from "../../components/update-profile";

const UserPage = () => {
  const { user } = useContext(AuthContext);

  const UPDATE_PROFILE_INFO = [{type: 'input', onChange}]

  return (
    <Layout>
      <h1>Hi {user.email}</h1>
      <div>
        <p>You have # products and # orders</p>
        <div>
          <h2>Update personal info here:</h2>
        </div>
        <section>
          <h2>Update personal info:</h2>
        </section>
      </div>
    </Layout>
  );
};

export default UserPage;

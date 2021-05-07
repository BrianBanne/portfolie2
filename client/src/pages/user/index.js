import React, { useContext } from "react";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <h1>Hi {user.email}</h1>
      <div>
        <p>You have # products and # orders</p>
        <div>
          <h2>Update personal info here:</h2>
        </div>
      </div>
    </Layout>
   
  );
};
    /* oauth2 shit jeg prøvde meg på
      <script>
      const query = window.location.search.substring(1)
      const token = query.split('access_token=')[1]
      fetch('//api.github.som/user', {
        headers: {
          Authorization: 'token ' + token
        }
      })
      .then(res => res.json())
      .then(res => {
        const nameNode = document.createTextNode(`Welcome, ${res.name}`)
			document.body.appendChild(nameNode)
      })
    </script>
    */

export default UserPage;

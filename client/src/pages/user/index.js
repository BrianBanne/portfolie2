import React, { useContext } from "react";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";
import ProfileInfo from "../../components/update-profile";
import Button from "../../components/shared/button";
import Form from "../../components/shared/form";


const UserPage = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
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

 // const UPDATE_PROFILE_INFO = [{type: 'input', onChange}]

  return (
    <Layout>
      <h1>Hi {user.email}</h1>
      <div>
        <p>You have # products and # orders</p>
      
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

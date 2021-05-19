import React, { useContext } from "react";
import { API } from "../../api";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/index";
import Button from "../../components/shared/button";
import Form from "../../components/shared/form";

const UserPage = () => {
  const { user, logout } = useContext(AuthContext);

  function handleSetShippingInfo(userDetails) {
    API.updateUserDetails(userDetails)
      .then(({ data }) => alert(data.message))
      .then()
      .catch((err) => alert(err.error));
  }

  const USER_SHIPPING_INFO = [
    {
      type: "title",
      label: "Update details",
    },
    {
      type: "input",
      label: "First name",
      name: "firstName",
    },
    {
      type: "input",
      label: "Last name",
      name: "lastName",
    },
    {
      type: "input",
      label: "Address",
      name: "address",
    },
    {
      type: "input",
      label: "Postcode",
      name: "postcode",
      inline: 1,
    },
    {
      type: "input",
      label: "City",
      name: "city",
      inline: 1,
    },
    {
      type: "submit",
      className: "button button__secondary mt1",
      label: "Update details",
    },
  ];

  return (
    <Layout>
      <div className="flex__row">
        <h1>Hi {user.email}</h1>

        <div>
          <Button
            label="Log out"
            style={{ width: "100px" }}
            secondary
            onClick={() => logout()}
          />
        </div>
      </div>
      <div>
        <Form
          title="Update shipping info"
          items={USER_SHIPPING_INFO}
          onSubmit={handleSetShippingInfo}
        />
      </div>
    </Layout>
  );
};
export default UserPage;

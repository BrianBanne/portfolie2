import React from "react";
import { useFormFields } from "../hooks";
import Button from "../shared/button";
import Input from "../shared/input";

const CheckoutContainer = () => {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(formFields);
  }

  const { formFields, createChangeHandler } = useFormFields({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  });

  return (
    <form className="checkoutForm" onSubmit={handleSubmit}>
      <Input
        label="First name"
        name="firstName"
        value={formFields.firstName}
        onChange={createChangeHandler("firstName")}
      />
      <Input
        label="Last name"
        name="lastName"
        value={formFields.lastName}
        onChange={createChangeHandler("lastName")}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formFields.email}
        onChange={createChangeHandler("email")}
      />
      <Input
        label="Address"
        name="address"
        value={formFields.address}
        onChange={createChangeHandler("address")}
      />
      <Input
        label="Phone"
        name="phone"
        value={formFields.phone}
        onChange={createChangeHandler("phone")}
      />
      <Button secondary type="submit" label="Place order"/>
    </form>
  );
};

export default CheckoutContainer;

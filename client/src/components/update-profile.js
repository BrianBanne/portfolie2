import React from "react";
import Input from "../components/shared/input";
import Button from "./shared/button";
import { useFormFields } from "../components/hooks/index";

const ProfileInfo = ({user}) => {
  const { form, createChangeHandler } = useFormFields({
    password1: "",
    password2: "",
  });

  function handleChangePassword(event) {
      event.preventDefault()
      console.log(form);
      //todo 
      //validate password strength and match
      //change password in db
  }

  return (
    <form onSubmit={handleChangePassword}>
      <Input
        label="Set new password"
        type="password"
        onChange={createChangeHandler("password1")}
      />
      <Input
        label="Enter again"
        type="password"
        onChange={createChangeHandler("password2")}
      />
      <Button type="submit" secondary label="Change password" />
    </form>
  );
};

export default ProfileInfo;

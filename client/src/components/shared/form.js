import React from "react";
import { useFormFields } from "../hooks";
import Button from "./button";
import Input from "./input";

const Form = ({ items }) => {
  const { formFields, createChangeHandler } = useFormFields({
    password: '',
    password2: ''
  });

  function handleSumbmit(event) {
    event.preventDefault();
    console.log(formFields);
  }
  return (
    <div className="form__container">
      <form onSubmit={handleSumbmit}>
        {items &&
          items.map(({ type, id, ...props }, idx) => {
            switch (type) {
              case "submit":
                return <Button type="submit" key={idx} {...props} />;
              case "input":
                return (
                  <Input
                    key={idx}
                    {...props}
                    onChange={createChangeHandler(props.name)}
                    value={props.value}
                  />
                );
              case "password":
                return (
                  <Input
                    key={idx}
                    {...props}
                    type="password"
                    onChange={createChangeHandler(props.name)}
                    value={props.value}
                  />
                );
              case "radio":
                return (
                  <Input
                    key={idx}
                    {...props}
                    onChange={createChangeHandler(props.name)}
                    value={props.value}
                  />
                );
              default:
                return null;
            }
          })}
      </form>
    </div>
  );
};

export default Form;

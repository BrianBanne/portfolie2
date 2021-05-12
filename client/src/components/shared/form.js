import React from "react";
import { useFormFields } from "../hooks";
import Button from "./button";
import Input from "./input";

const Form = ({ items, onSubmit, title }) => {
  const { formFields, createChangeHandler } = useFormFields({});

  function handleSumbmit(event) {
    event.preventDefault();
    onSubmit(formFields);
  }
  return (
    <form onSubmit={handleSumbmit} className="form__container">
      <h2>{title}</h2>
      {items &&
        items.map(({ type, id, ...props }, idx) => {
          switch (type) {
            case "input":
              return (
                <Input
                  key={idx}
                  {...props}
                  name={props.name}
                  onChange={createChangeHandler(props.name)}
                  value={formFields[props.name]}
                  inline={props.inline}
                />
              );
            case "email":
              return (
                <Input
                  key={idx}
                  {...props}
                  name={props.name}
                  type="email"
                  onChange={createChangeHandler(props.name)}
                  value={formFields[props.name]}
                />
              );
            case "password":
              return (
                <Input
                  key={idx}
                  {...props}
                  type="password"
                  onChange={createChangeHandler(props.name)}
                  value={formFields[props.name]}
                />
              );
            case "radio":
              return (
                <Input
                  key={idx}
                  {...props}
                  onChange={createChangeHandler(props.name)}
                  value={formFields[props.name]}
                />
              );
            case "submit":
              return (
                <Button
                  type="submit"
                  className={props.className}
                  key={idx}
                  {...props}
                />
              );
            case "text":
            return <p style={{textAlign:'center'}}>{props.content}</p>
            default:
              return null;
          }
        })}
    </form>
  );
};

export default Form;

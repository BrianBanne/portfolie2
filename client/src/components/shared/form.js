import React from "react";
import Button from "./button";
import Input from "./input";

const Form = ({ items }) => {
    
  return (
    <div className="form__container">
      {items &&
        items.map(({ type, id, ...props }, idx) => {
          switch (type) {
            case "button":
              return <Button key={idx} {...props} />;
            case "input":
              return <Input key={idx} {...props} />;
            case "radio":
              return <Input key={idx} {...props} />;
            default:
              return null;
          }
        })}
    </div>
  );
};

export default Form

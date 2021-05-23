import React, { useRef, useState } from "react";

const Input = ({ label, onChange, value = "", type = "text", ...props }) => {
  const inputRef = useRef();
  const [, setIsFocus] = useState(false);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <div className={`input__wrapper ${props.inline ? 'input__inline' : ''}`}>
      <label className="input__label" htmlFor={props.name}>{label}</label>
      <input
        className="input"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        type={type || "text"}
        ref={inputRef}
        {...props}
      />
    </div>
  );
};

export default Input;

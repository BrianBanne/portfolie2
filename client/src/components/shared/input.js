import React, { useRef, useState } from "react";

const Input = ({
  label,
  onChange,
  value = "",
  type = "text",
  ...props
}) => {
  const inputRef = useRef();
  const [isFocus, setIsFocus] = useState(false);

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
    <label className="input__label">
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
      <span className={`input__label-text ${isFocus ? (' input__label-text-focus') : ('')}  `}>{label}</span>
    </label>
  );
};

export default Input;

/* 

*/

import React from "react";

const Button = ({ primary, secondary, small, label, ...props }) => {
  if (primary)
    return (
      <button className="button button__primary" {...props}>
        {label}
      </button>
    );
  if (secondary)
    return (
      <button className="button button__secondary" {...props}>
        {label}
      </button>
    );
    if (small)
    return (
      <button className="button button__small"  {...props} >
        {label}
      </button>
    );
  else return <button className="button" {...props}>{label}</button>;
};

export default Button;

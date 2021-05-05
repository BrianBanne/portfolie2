import { useState } from "react";

export const useFormFields = (initialValues) => {
  const [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key) => (value) => {
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };
  return { formFields, createChangeHandler };
};


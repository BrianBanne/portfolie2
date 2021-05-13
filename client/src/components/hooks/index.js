import { useState } from "react";
import { useLocation } from "react-router";

export const useFormFields = (initialValues) => {
  const [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key) => (value) => {
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };
  return { formFields, createChangeHandler };
};

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}


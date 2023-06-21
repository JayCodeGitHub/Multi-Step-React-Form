import { useState } from "react";

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  budget: "",
  informations: "",
};

export function useMultiStepForm() {
  const [form, setForm] = useState(initialForm);

  const updateField = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return { form, setForm, updateField, initialForm };
}

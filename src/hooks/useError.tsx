import { useState } from "react";

const initialError = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  budget: "",
  informations: "",
};

export function useError() {
  const [error, setError] = useState(initialError);
  return { error, setError, initialError };
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { useError } from "../hooks/useError";
import Input from "./input";
import Step from "./step";
import axios from "axios";

function Form() {
  let [step, setStep] = useState(1);

  const { form, setForm, updateField, initialForm } = useMultiStepForm();
  const { error, setError, initialError } = useError();

  const stepBack = () => {
    setStep(step < 2 ? step : step - 1);
  };

  const stepContinue = () => {
    let valid = true;

    // Check setp 1
    if (step === 1) {
      if (!form.firstName) {
        setError({ ...initialError, firstName: "First name is required" });
        valid = false;
      } else if (!form.lastName) {
        setError({ ...initialError, lastName: "Last name is required" });
        valid = false;
      }

      // Check setp 2
    } else if (step === 2) {
      if (!form.phone) {
        setError({ ...initialError, phone: "Phone Number is required" });
        valid = false;
      } else if (!/^\+\d+\s\d{3}\s\d{3}\s\d{3}$/.test(form.phone)) {
        setError({
          ...initialError,
          phone: "Please use correct formatting. Example: +48 123 456 789",
        });
        valid = false;
      } else if (!form.email) {
        setError({ ...initialError, email: "Email is required" });
        valid = false;
      } else if (
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)
      ) {
        setError({
          ...initialError,
          email: "Please use correct formatting. Example: example@example.com",
        });
        valid = false;
      }

      // Check setp 3
    } else if (step === 3) {
      if (!form.budget) {
        setError({ ...initialError, budget: "Budget is required" });
        valid = false;
      }
    }

    if (valid) {
      setStep(step > 5 ? step : step + 1);
      setError(initialError);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 5) {
      return null;
    }
    setStep(5);
    try {
      const response = await axios.post(
        "https://multi-step-form.pl/submit",
        form
      );
      console.log(response);
    } catch (error: any) {
      console.error("Error:", error);
    }
    setForm(initialForm);
    setStep(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl"
    >
      <div className="flex justify-between p-8 rounded">
        <Step step={1} currentStep={step} />
        <Step step={2} currentStep={step} />
        <Step step={3} currentStep={step} />
        <Step step={4} currentStep={step} />
      </div>
      <div className="flex flex-col justify-start gap-2 px-8 space-y-2 h-60">
        {step === 1 ? (
          <>
            <Input
              error={error.firstName}
              name="firstName"
              value={form.firstName}
              placeholder="First Name"
              onChange={updateField}
            />
            <Input
              error={error.lastName}
              name="lastName"
              value={form.lastName}
              placeholder="Last Name"
              onChange={updateField}
            />
          </>
        ) : step === 2 ? (
          <>
            <Input
              error={error.phone}
              name="phone"
              value={form.phone}
              placeholder="Phone"
              onChange={updateField}
            />
            <Input
              error={error.email}
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={updateField}
            />
          </>
        ) : step === 3 ? (
          <Input
            error={error.budget}
            name="budget"
            value={form.budget}
            placeholder="Estimated budget"
            onChange={updateField}
            number
          />
        ) : step === 4 ? (
          <>
            <motion.textarea
              name="informations"
              value={form.informations}
              maxLength={250}
              placeholder="Additional information"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              onChange={updateField}
              className="w-full p-2 border-2 rounded-lg h-36 border-neutral-100"
            />
          </>
        ) : step === 5 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col w-full gap-1"
            >
              <p>First Name: {form.firstName}</p>
              <p>Last Name: {form.lastName}</p>
              <p>Phone: {form.phone}</p>
              <p>Email: {form.email}</p>
              <p>Budget: {form.budget}</p>
              {form.informations ? (
                <p>Additional information: {form.informations}</p>
              ) : null}
            </motion.div>
          </>
        ) : null}
      </div>
      <div className="px-8 pb-8">
        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={stepBack}
            className={`${
              step === 1 ? "pointer-events-none opacity-50" : ""
            } duration-350 rounded px-2 py-1 text-neutral-400 transition hover:text-neutral-700`}
          >
            Back
          </button>
          {step >= 5 ? (
            <motion.button
              type="submit"
              onClick={() => setStep(6)}
              className="bg duration-350 flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-blue-600 active:bg-blue-700"
            >
              Submit
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={stepContinue}
              className="bg duration-350 flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-blue-600 active:bg-blue-700"
            >
              Continue
            </motion.button>
          )}
        </div>
      </div>
    </form>
  );
}

export default Form;

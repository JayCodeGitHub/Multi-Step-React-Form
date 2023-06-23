import { useState } from "react";
import { motion } from "framer-motion";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { useError } from "../hooks/useError";
import { useAlert } from "@/hooks/useAlert";
import Input from "./input";
import Step from "./step";
import axios from "axios";

export default function Form() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { form, setForm, updateField, initialForm } = useMultiStepForm();
  const { error, setError, initialError } = useError();

  const { dispatchAlert, setStatus } = useAlert();

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
    setLoading(true);
    try {
      const [res] = await Promise.allSettled([
        axios.post("/api/submit", form),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
      if (res.status !== "fulfilled") throw res.reason;
      dispatchAlert(`Form sent successfully`);
      setStatus(true);
      setForm(initialForm);
      setStep(1);
    } catch (error: any) {
      console.error("Error:", error);
      setStatus(false);
      dispatchAlert(`Oops something went wrong`);
    }
    setLoading(false);
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
              className="bg duration-350 flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-blue-600 active:bg-blue-700 min-w-[5rem] min-h-[2.4rem]"
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                "Submit"
              )}
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

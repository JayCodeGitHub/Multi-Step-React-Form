import CheckIcon from "./checkIcon";
import { motion } from "framer-motion";

interface StepProps {
  step: number;
  currentStep: number;
}

function Step({ step, currentStep }: StepProps) {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";
  return (
    <motion.div animate={status} className="relative">
      <motion.div
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.2,
            },
          },
          complete: {
            scale: 1.25,
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "tween",
          ease: "circOut",
        }}
        className="absolute inset-0 bg-blue-200 rounded-full"
      />

      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: "#fff", // neutral
            borderColor: "#e5e5e5", // neutral-200
            color: "#a3a3a3", // neutral-400
          },
          active: {
            backgroundColor: "#fff",
            borderColor: "#3b82f6", // blue-500
            color: "#3b82f6", // blue-500
          },
          complete: {
            backgroundColor: "#3b82f6", // blue-500
            borderColor: "#3b82f6", // blue-500
            color: "#3b82f6", // blue-500
          },
        }}
        transition={{ duration: 0.2 }}
        className="relative flex items-center justify-center w-10 h-10 font-semibold border-2 rounded-full"
      >
        <div className="flex items-center justify-center">
          {status === "complete" ? (
            <CheckIcon className="w-6 h-6 text-white" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Step;

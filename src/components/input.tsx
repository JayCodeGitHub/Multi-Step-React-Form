import { motion } from "framer-motion";

interface InputProps {
  error: string;
  name: string;
  value: string | number;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  number?: boolean;
}

function Input({
  error,
  name,
  value,
  placeholder,
  onChange,
  number,
}: InputProps) {
  return (
    <>
      <span className="h-4 text-sm text-red-500 transition-all">
        {error ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
          >
            {error}
          </motion.span>
        ) : null}
      </span>
      <motion.input
        name={name}
        value={value}
        placeholder={placeholder}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        onChange={onChange}
        className={` ${
          error
            ? "bg-[#F8D3D3] border-red-500 placeholder-slate-700"
            : "bg-transparent border-neutral-100 placeholder-slate-400"
        } w-full p-2 border-2 rounded-lg transition-all`}
        type={number ? "number" : "string"}
      />
    </>
  );
}

export default Input;

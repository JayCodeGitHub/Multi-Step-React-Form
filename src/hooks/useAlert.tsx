import React, { useCallback, useContext, useState } from "react";

interface AlertProviderProps {
  children: React.ReactNode;
}

interface AlertContextProps {
  alert: string | null;
  dispatchAlert: (message: string) => void;
}

const AlertContext = React.createContext({} as AlertContextProps);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<string | null>(null);

  const dispatchAlert = useCallback((message: string) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 1500);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, dispatchAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const alertContext = useContext(AlertContext);

  return alertContext;
};

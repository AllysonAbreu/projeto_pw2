import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { TOASTIFY_STATE } from "../../constants/toastify/toastify.constants";

interface IToastifyState {
  title: string;
  message: string;
  type: string;
  show: boolean;
  duration: number;
}

const TOASTIFY_INITIAL_STATE: IToastifyState = {
  title: "",
  message: "",
  type: TOASTIFY_STATE.ERROR,
  show: false,
  duration: 3000,
};

interface IToastifyContext {
  toastify: IToastifyState;
  addToast: (toast: IToastifyState) => void;
}

const ToastifyContext = createContext<IToastifyContext>({
  toastify: TOASTIFY_INITIAL_STATE,
  addToast: () => {},
});

interface ToastifyProviderProps {
  children: ReactNode;
}

const ToastifyProvider: React.FC<ToastifyProviderProps> = ({ children }) => {
  const [toastify, setToastify] = useState<IToastifyState>(TOASTIFY_INITIAL_STATE);

  const addToast = useCallback((toast: IToastifyState) => {
    setToastify((prevState) => ({
      ...prevState,
      ...toast,
      show: true,
    }));
  }, []);

  useEffect(() => {
    if (toastify?.show) {
      const interval = setTimeout(() => {
        setToastify((prevState) => ({
          ...prevState,
          show: false,
        }));
      }, toastify.duration ?? 3000);

      return () => clearTimeout(interval);
    }
  }, [toastify?.title, toastify?.show, toastify?.duration]);

  return (
    <ToastifyContext.Provider value={{ toastify, addToast }}>
      {children}
    </ToastifyContext.Provider>
  );
};

export { ToastifyContext, ToastifyProvider };

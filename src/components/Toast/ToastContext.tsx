import React, { createContext, useContext, useRef } from "react";
import ToastModel, { ToastRef, ToastProps } from "./ToastModel";

// Define o tipo do contexto
interface ToastContextProps {
  showToast: (props: ToastProps) => void;
  
}

// Criação do contexto
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Provider do Toast
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastRef = useRef<ToastRef>(null);

  const showToast = (props: ToastProps) => {
    toastRef.current?.show(props);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastModel ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};

// Hook personalizado para usar o toast
export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro do ToastProvider");
  }
  return context;
};

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Toast } from "primereact/toast";

// Interface para as propriedades do toast
export interface ToastProps {
  severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined;
  summary: string;
  detail: string;
  life?: number;
}

// Define o tipo para a referência do Toast
export interface ToastRef {
  show: (props: ToastProps) => void;
}

// Componente de Toast encapsulado
const ToastModel = forwardRef<ToastRef>((_, ref) => {
  const toast = useRef<Toast>(null);

  useImperativeHandle(ref, () => ({
    show: (props: ToastProps) => {
      toast.current?.show({
        severity: props.severity,
        summary: props.summary,
        detail: props.detail,
        life: props.life || 3000,
      });
    },
  }));

  return <Toast ref={toast} />;
});

export default ToastModel;

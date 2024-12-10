import { Toast } from "primereact/toast";
import { useRef, forwardRef, useImperativeHandle } from "react"

// Componente ToastModel
const ToastModel = forwardRef((props, ref) => {
  const toastRef = useRef(null);

  // Expor o método `show` para ser usado pelo componente pai
  useImperativeHandle(ref, () => ({
    show: (severity, summary, detail) => {
      toastRef.current.show({ severity, summary, detail });
    },
  }));

  return <Toast ref={toastRef} position="bottom-center" />;
});

export default ToastModel;

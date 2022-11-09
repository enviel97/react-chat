import { toast, ToastPosition, UpdateOptions } from "react-toastify";

interface PromiseToastProps<T = any> {
  action: () => Promise<T>;
  position?: ToastPosition;
  pending?: string;
  onSuccess?: (res: T) => void;
  onError?: () => void;
}

export const PromiseToast = async (props: PromiseToastProps) => {
  const {
    action,
    pending = "Loading...",
    onSuccess,
    onError,
    position = "top-right",
  } = props;

  const toastOption: UpdateOptions = {
    position: position,
    isLoading: false,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    // auto close
    closeOnClick: true,
    closeButton: true,
    draggableDirection: "x",
    draggable: true,
    draggablePercent: 40,
  };

  const toastId = toast.loading(pending, {
    closeButton: false,
  });

  setTimeout(() => {
    toast.update(toastId, {
      closeButton: false,
    });
  }, 2500);
  await action()
    .then((res) => {
      onSuccess?.call(this, res);
      toast.update(toastId, {
        render: `${res?.message ?? "Success"}`,
        ...(toastOption as any),
        type: "success",
        autoClose: 700,
      });
    })
    .catch((err) => {
      toast.update(toastId, {
        render: `${err.message ?? "Error"}`,
        ...(toastOption as any),
        type: "error",
        autoClose: 1500,
        onClose: onError,
      });
    });
};

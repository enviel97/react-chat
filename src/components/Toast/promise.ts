import string from "@utils/string";
import { toast, ToastPosition, UpdateOptions } from "react-toastify";
interface Props extends PromiseToastProps {
  position?: ToastPosition;
}

export const PromiseToast = async (props: Props) => {
  const {
    action,
    pending = "Loading...",
    onSuccess,
    onError,
    onFinally,
    position = "top-right",
    delayOnFailure = 1500,
    delayOnSuccess = 1000,
    abortCallback,
  } = props;

  const toastOption: UpdateOptions = {
    position: position,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    // auto close
    closeOnClick: true,
    closeButton: true,
    draggableDirection: "x",
    draggable: true,
    draggablePercent: 40,
  };

  const toastId = toast(pending, { closeButton: false, isLoading: true });
  setTimeout(() => {
    if (toast.isActive(toastId)) {
      abortCallback && abortCallback();
      toast.update(toastId, { closeButton: true });
    }
  }, 2500);
  try {
    const result = await action();
    onSuccess && onSuccess(result);
    toast.update(toastId, {
      render: `${result?.message ?? "Success"}`,
      ...(toastOption as any),
      isLoading: false,
      type: "success",
      autoClose: delayOnSuccess,
    });
    onFinally && onFinally();
  } catch (err: any) {
    onError && onError();
    const axiosToastId = (err?.message ?? "Error")
      .toLowerCase()
      .replaceAll(" ", "");
    toast.clearWaitingQueue();
    toast.update(axiosToastId, {
      render: `${err?.message ?? "Error"}`,
      ...(toastOption as any),
      toastId: toastId,
      isLoading: false,
      type: "error",
      autoClose: delayOnFailure,
    });
    onFinally && onFinally();
  }
};

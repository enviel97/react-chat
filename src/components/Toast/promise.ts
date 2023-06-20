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
  const toastId = string.genId();

  const toastOption: UpdateOptions = {
    toastId: toastId,
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

  toast(pending, { toastId, closeButton: false, isLoading: true });
  setTimeout(() => {
    if (toast.isActive(toastId)) {
      abortCallback && abortCallback();
      toast.update(toastId, { closeButton: true });
    }
  }, 2500);

  await action()
    .then((res) => {
      onSuccess && onSuccess(res);
      toast.update(toastId, {
        render: `${res?.message ?? "Success"}`,
        ...(toastOption as any),
        type: "success",
        autoClose: delayOnSuccess,
      });
      onFinally && onFinally();
    })
    .catch((err) => {
      onError && onError();
      const axiosToastId = (err?.message ?? "Error")
        .toLowerCase()
        .replaceAll(" ", "");
      toast.update(axiosToastId, {
        render: `${err?.message ?? "Error"}`,
        ...(toastOption as any),
        updateId: axiosToastId,
        isLoading: false,
        type: "error",
        autoClose: delayOnFailure,
      });
      onFinally && onFinally();
    });
};

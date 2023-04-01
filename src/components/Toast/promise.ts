import { toast, ToastPosition, UpdateOptions } from "react-toastify";

interface PromiseToastProps<T = any> {
  /**
   * callback function return promise function
   * @returns promise function
   */
  action: () => Promise<T>;
  position?: ToastPosition;
  pending?: string;
  delayOnSuccess?: number;
  delayOnFailure?: number;
  updateToastOnError?: boolean;
  /**
   * onSuccess when call promise function, get return of callback function if have
   * @returns void
   */
  onSuccess?: (res: T) => void;
  onError?: () => void;

  /**
   * Execute on all case success and error
   * @returns void
   */
  onFinally?: () => void;
}

export const PromiseToast = async (props: PromiseToastProps) => {
  const {
    action,
    pending = "Loading...",
    onSuccess,
    onError,
    onFinally,
    position = "top-right",
    updateToastOnError = false,
    delayOnFailure = 1500,
    delayOnSuccess = 1000,
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
      if (updateToastOnError) {
        toast.update(toastId, {
          render: `${err?.message ?? "Error"}`,
          ...(toastOption as any),
          type: "error",
          autoClose: delayOnFailure,
        });
      } else {
        toast.dismiss(toastId);
      }
      onFinally && onFinally();
    });
};

import { toast } from "react-toastify";

export const Status = new Map<number, string>([
  [500, "Internal Server Error"],
  [401, "You should login first"],
  [403, "Your login phase are expired"],
  [400, "Bad request error!"],
]);

export const safeLog = (args: any) => {
  if (import.meta.env.VITE_NODE_ENV === "dev") {
    console.log(args);
    return;
  }
  console.log("Error occurs !");
};

export const showToast = (message: string) => {
  toast.clearWaitingQueue();
  const toastId = message.toLowerCase().replaceAll(" ", "");
  if (!toast.isActive(toastId)) {
    toast.error(message, {
      toastId: toastId,
    });
  }
};

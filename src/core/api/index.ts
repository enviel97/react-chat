import { baseUrlAPI } from "@common/config.define";
import axios from "axios";
import { toast } from "react-toastify";
import { safeLog } from "./utils/logger";
import { isLoginRequired, isServerError } from "./utils/statusValid";
import "@core/utils/api";

const ERR_CANCELED = "ERR_CANCELED";

const showToast = (message: string) => {
  toast.clearWaitingQueue();
  const toastId = message.toLowerCase().replaceAll(" ", "");
  if (!toast.isActive(toastId)) {
    toast.error(message, {
      toastId: toastId,
    });
  }
};

const client = axios.create({
  baseURL: baseUrlAPI,
  timeout: 5000, // 5s
  timeoutErrorMessage: "Timeout error",
  headers: {
    "Content-Type": "application/json",
  },
});

const errorHandler = (err: any) => {
  if (err.code !== ERR_CANCELED) safeLog(err);

  if (err.response) {
    const { status = 500 } = err.response;
    if (isServerError(status)) {
      showToast(err.response.data?.message ?? "Internal Server Error");
    } else if (isLoginRequired(status)) {
      showToast("You must log in first");
      return Promise.reject(err.response);
    } else {
      showToast(err.response.data?.message ?? "Server not found");
    }
    return Promise.reject({
      code: err.response.data?.code ?? err.response.code,
      message: err.response.data?.message ?? err.response.message,
      data: err.response.data?.data ?? err.response.data,
    });
  }

  showToast(err.request.message ?? "Interval Client Error");
  return Promise.reject({
    code: err.request?.code ?? err.code,
    message: err.request?.message ?? err.message,
    data: err.request?.data ?? err.data,
  });
};

client.interceptors.request.use((config) => {
  config.withCredentials = true;
  if (!config.pathVariable) return config;
  // parse pathName to implement variables
  let currentUrl = config.url ?? "";
  Object.entries(config.pathVariable || {}).forEach(([k, v]) => {
    currentUrl = currentUrl.replace(`:${k}`, encodeURIComponent(v));
  });

  return {
    ...config,
    url: currentUrl,
  };
}, errorHandler);

client.interceptors.response.use((response) => {
  try {
    return response.data;
  } catch (error) {
    // Error undefine
    return Promise.reject({ message: "Client error" });
  }
}, errorHandler);

export default client;

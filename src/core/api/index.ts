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
  try {
    if (err.code === ERR_CANCELED) {
      return {
        code: err.code,
        message: err.message,
        data: undefined,
      };
    }
    if (err.response) {
      const { status = 500 } = err.response;
      if (isServerError(status)) {
        showToast(err.response.data?.message ?? "Internal Server Error");
      } else if (isLoginRequired(status)) {
        showToast("You must log in first");
      } else {
        showToast(err.response.data?.message ?? "Server not found");
      }
      return {
        code: err.response.data?.code ?? err.code,
        message: err.response.data?.message ?? err.message,
        data: undefined,
      };
    } else if (err.request) {
      showToast(err.request.message ?? "Interval Server Error");
      return {
        code: err.request?.code ?? err.code,
        message: err.request?.message ?? err.message,
        data: undefined,
      };
    }

    return {
      code: err.code,
      message: err.message,
      data: undefined,
    };
  } catch (error) {
    showToast("Some error occur, we don't known");
    return {
      code: err.code,
      message: err.message,
      data: undefined,
    };
  } finally {
    if (err.code !== ERR_CANCELED) safeLog(err);
  }
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
